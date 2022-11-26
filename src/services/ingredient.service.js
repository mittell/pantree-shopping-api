const { Ingredient } = require('../models/ingredient.model');
const IngredientToReturnDto = require('../dtos/ingredientToReturn.dto');

const getAll = async () => {
	const results = [];

	const ingredientsFromServer = await Ingredient.find({});

	for (const ingredient of ingredientsFromServer) {
		let ingredientToReturn = new IngredientToReturnDto();
		results.push(ingredientToReturn.mapFromResult(ingredient));
	}

	return results;
};

const getById = async (id) => {
	const result = new IngredientToReturnDto();

	const ingredientFromServer = await Ingredient.findById(id);

	return result.mapFromResult(ingredientFromServer);
};

const getByName = async (name) => {
	return await Ingredient.findOne({ name: name });
};

const add = async (ingredientData) => {
	const ingredientToAdd = new Ingredient({
		name: ingredientData.name,
		amount: ingredientData.amount,
		measurement: ingredientData.measurement,
	});

	return await ingredientToAdd.save();
};

const updateById = async (ingredientData) => {
	const ingredientToUpdate = Ingredient.findById(ingredientData.id);

	ingredientToUpdate.name = ingredientData.name;
	ingredientToUpdate.amount = ingredientData.amount;
	ingredientToUpdate.measurement = ingredientData.measurement;

	return await ingredientToUpdate.save();
};

const deleteById = async (id) => {
	const ingredientToDelete = Ingredient.findById(id);

	return await ingredientToDelete.remove();
};

module.exports = {
	getAll,
	getById,
	getByName,
	add,
	updateById,
	deleteById,
};
