import { hash } from "bcrypt";
import { Request, Response } from "express";
import { prismaService } from '../Service/prismaService';

export class UserController {
  async read(req: Request, res: Response) {
    const id = req.userID;

    try {
      const user = await prismaService.user.findUnique({
        where: { id },
      });
      res.status(200).json({ user });
    } catch (err) {
      res.status(500).json({ message: "Erro ao procurar por Usuário" });
    }
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Campo name obrigatorio" });
    }
    if (!email) {
      return res.status(400).json({ error: "Campo email obrigatorio" });
    }
    if (!password) {
      return res.status(400).json({ error: "Campo password obrigatorio" });
    }

    const encryptedPassword = await hash(password, 10);


	const userAlreadyExists = await prismaService.user.findUnique({
		where: {
			email
		}
	});

	if (userAlreadyExists) {
		return res.status(400).json({ error: 'Email já cadastrado'})
	}

    try {
      await prismaService.user.create({
        data: {
          name,
          email,
          password: encryptedPassword,
        },
      });
      res.status(201).json({ message: "Usuário Criado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao criar o Usuário" });
    }
  }
  async update(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const id = req.userID;

    if (!name) {
      return res.status(400).json({ error: "Campo name obrigatorio" });
    }
    if (!email) {
      return res.status(400).json({ error: "Campo email obrigatorio" });
    }
    if (!password) {
      return res.status(400).json({ error: "Campo password obrigatorio" });
    }

    try {
      await prismaService.user.update({
        where: { id },
        data: {
          name,
          email,
          password,
        },
      });
      res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (err) {
      res.status(500).json({
        message: "Erro ao atualizar dados de Usuário",
      });
    }
  }

  async delete(req: Request, res: Response) {
    const id = req.userID;

    try {
      await prismaService.user.delete({
        where: { id },
      });
      res.status(200).json({ message: "Usuário excluido com sucesso" });
    } catch (err) {
      res.status(500).json({ message: "Erro ao excluir Usuário" });
    }
  }

  async updateImage(req: Request, res: Response) {
    const { filename } = req?.file || {};
    const id = req.userID;
    const image = filename ? "http://localhost:3000/images/" + filename : null;
    await prismaService.user.update({
      where: { id },
      data: { image },
    });
    res.status(200).json({
      message: "Imagem de perfil salva com sucesso!",
      image,
    });
  }
}
