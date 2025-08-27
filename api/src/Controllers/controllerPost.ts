import { Request, Response } from "express";
import { prismaService } from "../Service/prismaService";

interface IngredientInput {
  id: number;
}

export class PostController {
  async create(req: Request, res: Response) {
    const userId = req.userID;
    const { title, description, ingredients: ingredientsRecipe } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    if (!title) {
      return res
        .status(400)
        .json({ message: "É necessário um título para criar uma postagem" });
    }

    if (!description) {
      return res.status(400).json({
        message: "É necessário uma descrição para criar uma postagem",
      });
    }

    if (ingredientsRecipe?.length === 0) {
      console.log("Nenhum ingrediente foi adicionado na receita!");
    }

    try {
      await prismaService.post.create({
        data: {
          title,
          description,
          authorId: userId,
          ingredients: {
            create: (ingredientsRecipe || []).map(
              (ingredient: IngredientInput) => ({
                ingredient: { connect: { id: ingredient.id } },
              })
            ),
          },
        },
      });

      res.status(201).json({ message: "Sua postagem foi salva com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar a receita" });
    }
  }
  async readAll(req: Request, res: Response) {
    try {
      const posts = await prismaService.post.findMany({
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          ingredients: {
            where: {
              ingredientId: { not: null },
              ingredient: { deleted_at: null },
            },
            select: {
              ingredient: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
  
      res.status(200).json(posts);
    } catch (error) {
      console.log("Erro ao buscar posts");
      console.log(error);
      res.status(404).json({ message: "Postagens não encontradas" });
    }
  }
  
  async read(req: Request, res: Response) {
    const { postId } = req.params;

    try {
      const post = await prismaService.post.findUnique({
        where: { id: Number(postId) },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          comments: {
            include: {
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
          ingredients: {
            select: {
              ingredient: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
            where: {
              ingredient: {
                deleted_at: null,
              },
            },
          },
        },
      });

      if (!post) {
        return res.status(404).json({ message: "Postagem não encontrada" });
      }

      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar postagem" });
    }
  }

  async readByUser(req: Request, res: Response) {
    const userId = req.userID;

    if (!userId) {
      return res.status(401).json({ message: "Usuário não autorizado" });
    }

    try {
      const posts = await prismaService.post.findMany({
        where: {
          authorId: Number(userId),
        },
        include: {
          comments: true,
          ingredients: {
            select: {
              ingredient: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      res.status(200).json(posts);
    } catch {
      res.status(404).json({ message: "Postagens não encontradas" });
    }
  }

  async update(req: Request, res: Response) {
    const { title, description, ingredientsRecipe } = req.body as {
      title: string;
      description: string;
      ingredientsRecipe?: IngredientInput[];
    };
    const { postId } = req.params;

    const post = await prismaService.post.findUnique({
      where: { id: Number(postId) },
      include: { ingredients: true },
    });

    if (!post)
      return res.status(404).json({ message: "Postagem não encontrada" });
    if (!title)
      return res.status(400).json({
        message: "É necessário um título para atualizar uma postagem",
      });
    if (!description)
      return res.status(400).json({
        message: "É necessário uma descrição para atualizar uma postagem",
      });

    const existingIngredientIds = post.ingredients.map((i) => i.ingredientId);
    const newIngredientIds = (ingredientsRecipe || []).map(
      (i: IngredientInput) => i.id
    );

    const toAdd = newIngredientIds.filter(
      (id: number) => !existingIngredientIds.includes(id)
    );
    const toRemove = post.ingredients
      .filter(
        (i) =>
          i.ingredientId !== null && !newIngredientIds.includes(i.ingredientId)
      )
      .map((i) => i.id);

    try {
      await prismaService.post.update({
        where: { id: Number(postId) },
        data: {
          title,
          description,
          ingredients: {
            create: toAdd.map((id: number) => ({
              ingredient: { connect: { id } },
            })),
            delete: toRemove.map((id: number) => ({ id })),
          },
        },
      });

      res.status(200).json({ message: "Postagem atualizada com sucesso" });
    } catch {
      res
        .status(500)
        .json({ message: "Não foi possível atualizar a postagem" });
    }
  }

  async disconnectIngredientFromPost(req: Request, res: Response) {
    try {
      const { postId, ingredientId } = req.params;

      const pivot = await prismaService.ingredientsOnPosts.findFirst({
        where: {
          postId: Number(postId),
          ingredientId: Number(ingredientId),
        },
      });

      if (!pivot) {
        return res
          .status(404)
          .json({ message: "Ingrediente não encontrado na postagem" });
      }

      await prismaService.ingredientsOnPosts.delete({
        where: { id: pivot.id },
      });

      res
        .status(200)
        .json({ message: "Ingrediente desconectado da postagem com sucesso" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Não foi possível desconectar o ingrediente" });
    }
  }

  async delete(req: Request, res: Response) {
    const { postId } = req.params;

    const post = await prismaService.post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Postagem não encontrada" });
    }

    try {
      await prismaService.post.delete({
        where: {
          id: post.id,
        },
      });
      res.status(200).json({ message: "Postagem deletada com sucesso" });
    } catch {
      res.status(500).json({
        message: "Não foi possível deletar a postagem",
      });
    }
  }
}
