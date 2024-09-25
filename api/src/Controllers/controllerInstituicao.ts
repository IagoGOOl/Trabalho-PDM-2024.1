import { Request, Response } from "express";
import { prismaService } from '../Service/prismaService';


export class InstituicaoController {
   async create(req: Request, res: Response) {
    const { name, latitude, longitude } = req.body;
    const userId = req.userID;

    if (!userId) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    if (!name || !latitude || !longitude) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
      await prismaService.instituicao.create({
        data: {
          name,
          latitude,
          longitude,
          createdById: userId,
        },
      });
      res.status(201).json({ message: "Instituição criada com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao criar a instituição" });
    }
  }

  async readAll(req: Request, res: Response) {
    try {
      const instituicoes = await prismaService.instituicao.findMany({
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      res.status(200).json(instituicoes);
    } catch {
      res.status(404).json({ message: "Instituições não encontradas" });
    }
  }
  async delete(req: Request, res: Response) {
    const { instituicaoId } = req.params;
    try {
      const instituicao = await prismaService.instituicao.delete({
        where: {
          id: Number(instituicaoId),
        },
      });
      res.status(200).json({
        message: "Instituição excluida com sucesso",
      });
    } catch {
      res.status(404).json({ message: "Istituição não encontrada" });
    }
  }

  async update(req: Request, res: Response) {
    const { instituicaoId } = req.params;
    const { name, latitude, longitude } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Campo name obrigatorio" });
    }
    if (!latitude) {
      return res.status(400).json({ error: "Campo latitude obrigatorio" });
    }
    if (!longitude) {
      return res.status(400).json({ error: "Campo longitude obrigatorio" });
    }
    try {
      const instituicao = await prismaService.instituicao.update({
        where: {
          id: Number(instituicaoId),
        },
        data: {
          name,
          latitude,
          longitude,
        },
      });
      res.status(200).json({
        message: "Instituição atualizada com sucesso",
      });
    } catch {
      res.status(404).json({
        message: " Erro ao atualizar a instituição",
      });
    }
  }
}
