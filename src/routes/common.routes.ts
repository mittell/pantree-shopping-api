import { Application, Request, Response, Router } from 'express';
import env from '../config/env.config';

export function registerCommonRoutes(app: Application) {
	app.use(`/api/`, commonRoutes());
}

function commonRoutes() {
	const router = Router();

	router.get('/', async (_req: Request, res: Response) => {
		res.status(200).json({
			name: 'Pantree - Shopping API',
			description: 'API for Pantree Web App.',
			version: env.API_VERSION,
		});
	});

	return router;
}
