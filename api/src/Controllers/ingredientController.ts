import { Request, Response } from "express";
import { prismaService } from "../Service/prismaService";

export class IngredientController {
  async readAllIngredients(req: Request, res: Response) {
    try {
      const ingredients = await prismaService.ingredient.findMany({
        where: {
            deleted_at: null
        }
      });
      return res.status(200).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar os ingredientes." });
    }
  }

  async readIngredientById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ingredient = await prismaService.ingredient.findUnique({
        where: {
          id: Number(id),
          deleted_at: null
        },
      });
      return res.status(200).json(ingredient);
    } catch (error) {
      res.status(500).json({ message: "Erro ao buscar o ingrediente." });
    }
  }

  async createIngredients(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const ingredients = await prismaService.ingredient.create({
        data: {
          name,
        },
      });
      return res.status(201).json(ingredients);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar o ingrediente." });
    }
  }

  async updateIngredient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const ingredients = await prismaService.ingredient.update({
        where: {
          id: Number(id),
          deleted_at: null
        },
        data: {
          name,
        },
      });
      return res.status(200).json(ingredients);
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: "Erro ao atualizar os ingredientes." });
    }
  }

  async deleteIngredient(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ingredients = await prismaService.ingredient.update({
        where: {
          id: Number(id),
          deleted_at: null
        },
        data: {
            deleted_at: new Date()
        }
      });
      return res.status(200).json(ingredients);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro ao deletar o ingrediente." });
    }
  }
}
