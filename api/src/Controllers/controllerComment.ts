import { Request, Response } from "express";
import { prismaService } from '../Service/prismaService';

function response(res: Response, message: string, status: number = 400) {
  return res.status(status).json({ message });
}

export class CommentController {
  async create(req: Request, res: Response) {
    const userId = req.userID;
    const { postId } = req.params;
    const { description } = req.body;

    if (!userId) {
      return response(
        res,
        "usuario não autorizado, Faça login e tente novamente!"
      );
    }

    if (!postId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    if (!description) {
      return response(res, "Não é possível criar um comentário vazio");
    }

    try {
      await prismaService.comment.create({
        data: {
          description,
          postId: Number(postId),
          authorId: userId,
        },
      });
      response(res, "Seu comentário foi salvo com sucesso", 200);
    } catch (err) {
      response(res, "Erro ao criar comentário", 500);
    }
  }

  async readAll(req: Request, res: Response) {
    const { postId } = req.params;

    if (!postId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    try {
      const comments = await prismaService.comment.findMany({
        where: {
          postId: Number(postId),
        },
      });

      res.status(200).json(comments);
    } catch {
      response(res, "Comentários não encontrados", 404);
    }
  }

  async read(req: Request, res: Response) {
    const { postId, id: commentId } = req.params;

    if (!postId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    if (!commentId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    try {
      const comment = await prismaService.comment.findFirst({
        where: {
          id: Number(commentId),
          postId: Number(postId),
        },
      });

      res.status(200).json(comment);
    } catch {
      response(res, "Comentário não encontrado", 404);
    }
  }

  async update(req: Request, res: Response) {
    const userId = req.userID;
    const { postId, id: commentId } = req.params;
    const { description } = req.body;

    if (!userId) {
      return response(res, "Você não pode atualizar esse comentário!", 403);
    }

    if (!postId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    if (!commentId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    if (!description) {
      return response(res, "Não é possível atualizar um comentário vazio");
    }

    try {
      await prismaService.comment.update({
        where: {
          id: Number(commentId),
          postId: Number(postId),
          authorId: userId,
        },
        data: {
          description,
        },
      });

      res.status(200).json({
        message: "Comentário atualizado com sucesso",
      });
    } catch {
      response(res, "Não foi possível atualizar o comentário", 403);
    }
  }

  async delete(req: Request, res: Response) {
    const userId = req.userID;
    const { postId, id: commentId } = req.params;

    if (!userId) {
      return response(
        res,
        "Você não pode deletar esse comentário! Faça o login e tente novamente",
        403
      );
    }

    if (!postId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    if (!commentId) {
      return response(
        res,
        "O que faz nessa rota? Seu curioso! Volte para a página inicial e tente novamente!"
      );
    }

    try {
      await prismaService.comment.delete({
        where: {
          id: Number(commentId),
          postId: Number(postId),
          authorId: userId,
        },
      });

      res.status(200).json({
        message: "Comentário deletado com sucesso",
      });
    } catch {
      response(res, "Não foi possível deletar o comentário", 403);
    }
  }
}
