import { Request, Response, NextFunction } from 'express';
import RecipeService from '../services/recipe.service';

class RecipeController {
	async getAllRecipes(_req: Request, res: Response, next: NextFunction) {
		await RecipeService.getAll()
			.then((recipes) => {
				return res.json(recipes);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getRecipeById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await RecipeService.getById(id!)
			.then((recipe) => {
				return res.json(recipe);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async getRecipeByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		await RecipeService.getByName(name!)
			.then((recipe) => {
				return res.json(recipe);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async addRecipe(req: Request, res: Response, next: NextFunction) {
		const recipeData = req.body;

		await RecipeService.add(recipeData)
			.then((recipe) => {
				return res.json(recipe);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async updateRecipeById(req: Request, res: Response, next: NextFunction) {
		const recipeData = req.body;

		await RecipeService.updateById(recipeData)
			.then((recipe) => {
				return res.json(recipe);
			})
			.catch((error) => {
				return next(error);
			});
	}

	async deleteRecipeById(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		await RecipeService.deleteById(id!)
			.then(() => {
				return res.sendStatus(200);
			})
			.catch((error) => {
				return next(error);
			});
	}
}

export default new RecipeController();
