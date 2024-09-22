import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export type tonkenPayload = {
	id: string;
	iat: number;
	exp: number;
};

export function AuthMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({ error: 'token not provided' });
	}

	const [, token] = authorization.split(' ');
	try {
		const decoded = verify(token, 'chaveSecreta');
		const { id } = decoded as tonkenPayload;
		req.userID = Number(id);
		next();
	} catch (error) {
		return res.status(401).json({ error: 'Token Invalid' });
	}
}
