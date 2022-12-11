import { Request, Response, NextFunction } from 'express';
import IngredientService from '../services/ingredient.service';

class IngredientController {
	async getAllIngredients(_req: Request, res: Response, next: NextFunction) {
		await IngredientService.getAll()
			.then((ingredients) => {
				return res.json(ingredients);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getIngredientById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await IngredientService.getById(id!)
			.then((ingredient) => {
				return res.json(ingredient);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getIngredientByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		await IngredientService.getByName(name!)
			.then((ingredient) => {
				return res.json(ingredient);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async addIngredient(req: Request, res: Response, next: NextFunction) {
		const ingredientData = req.body;

		await IngredientService.add(ingredientData)
			.then((ingredient) => {
				return res.json(ingredient);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async updateIngredientById(req: Request, res: Response, next: NextFunction) {
		const ingredientData = req.body;

		await IngredientService.updateById(ingredientData)
			.then((ingredient) => {
				return res.json(ingredient);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async deleteIngredientById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await IngredientService.deleteById(id!)
			.then(() => {
				return res.sendStatus(200);
			})
			.catch((error) => {
				return next(error);
			});
	}
}

export default new IngredientController();
