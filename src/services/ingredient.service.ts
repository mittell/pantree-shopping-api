import Ingredient from '../models/ingredient.model';
import { IngredientToReturnDto } from '../dtos/ingredientToReturn.dto';

class IngredientService {
	getAll = async () => {
		const results = [];

		const ingredientsFromServer = await Ingredient.find({});

		for (const ingredient of ingredientsFromServer) {
			let ingredientToReturn = new IngredientToReturnDto();
			results.push(ingredientToReturn.mapFromResult(ingredient));
		}

		return results;
	};

	getById = async (id: string) => {
		const result = new IngredientToReturnDto();

		const ingredientFromServer = await Ingredient.findById(id);

		return result.mapFromResult(ingredientFromServer);
	};

	getByName = async (name: string) => {
		return await Ingredient.findOne({ name: name });
	};

	add = async (ingredientData: any) => {
		const ingredientToAdd = new Ingredient({
			name: ingredientData.name,
			amount: ingredientData.amount,
			measurement: ingredientData.measurement,
		});

		return await ingredientToAdd.save();
	};

	updateById = async (ingredientData: any) => {
		const ingredientToUpdate = await Ingredient.findById(ingredientData.id);

		ingredientToUpdate!.name = ingredientData.name;
		ingredientToUpdate!.measurement = ingredientData.measurement;

		return await ingredientToUpdate!.save();
	};

	deleteById = async (id: string) => {
		const ingredientToDelete = await Ingredient.findById(id);

		return await ingredientToDelete!.remove();
	};
}

export default new IngredientService();
