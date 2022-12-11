import Recipe from '../models/recipe.model';
import { RecipeToReturnDto } from '../dtos/recipeToReturn.dto';

class RecipeService {
	getAll = async () => {
		const results = [];

		const recipesFromServer = await Recipe.find({}).populate({
			path: 'ingredients',
			populate: {
				path: 'ingredient',
			},
		});

		for (const recipe of recipesFromServer) {
			let recipeToReturn = new RecipeToReturnDto();
			results.push(recipeToReturn.mapFromResult(recipe));
		}

		return results;
	};

	getById = async (id: string) => {
		const result = new RecipeToReturnDto();

		const recipeFromServer = await Recipe.findById(id).populate({
			path: 'ingredients',
			populate: {
				path: 'ingredient',
			},
		});

		return result.mapFromResult(recipeFromServer);
	};

	getByName = async (name: string) => {
		return await Recipe.findOne({ name: name });
	};

	add = async (recipeData: any) => {
		const recipeToAdd = new Recipe({
			name: recipeData.name,
			ingredients: recipeData.ingredients,
		});

		return await recipeToAdd.save();
	};

	updateById = async (recipeData: any) => {
		const recipeToUpdate = await Recipe.findById(recipeData.id);

		recipeToUpdate!.name = recipeData.name;
		recipeToUpdate!.ingredients = recipeData.ingredients;

		return await recipeToUpdate!.save();
	};

	deleteById = async (id: string) => {
		const recipeToDelete = await Recipe.findById(id);

		return await recipeToDelete?.remove();
	};
}

export default new RecipeService();
