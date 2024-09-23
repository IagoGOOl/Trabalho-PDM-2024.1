import { Request, Response } from 'express';
import { prismaService } from '../Service/prismaService';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export class AuteticaControleer {
	async auteticacao(req: Request, res: Response) {
		const { email, password } = req.body;

		const user = await prismaService.user.findUnique({ where: { email } });
		if (!user) {
			return res
				.status(401)
				.json({ error: 'email or password invalide' });
		}
		const isValuePassword = await compare(password, user.password);
		if (!isValuePassword) {
			return res
				.status(401)
				.json({ error: 'email or password invalide' });
		}
		const token = sign({ id: user.id }, 'chaveSecreta', {
			expiresIn: '1d',
		});

		const { id } = user;
		return res.status(201).json({ user: { id, email }, token });
	}
}
