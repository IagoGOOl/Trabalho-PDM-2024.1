import { Express } from 'express';

declare global {
	namespace Express {
		interface Request {
			userID?: number;
			file?: Express.Multer.File;
		}
	}
}
