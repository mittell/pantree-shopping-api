const { Recipe } = require('../models/recipe.model');
const RecipeToReturnDto = require('../dtos/recipeToReturn.dto');

const getAll = async () => {
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

const getById = async (id) => {
	const result = new RecipeToReturnDto();

	const recipeFromServer = await Recipe.findById(id).populate({
		path: 'ingredients',
		populate: {
			path: 'ingredient',
		},
	});

	return result.mapFromResult(recipeFromServer);
};

const getByName = async (name) => {
	return await Recipe.findOne({ name: name });
};

const add = async (recipeData) => {
	const recipeToAdd = new Recipe({
		name: recipeData.name,
		ingredients: recipeData.ingredients,
	});

	return await recipeToAdd.save();
};

const updateById = async (recipeData) => {
	const recipeToUpdate = Recipe.findById(recipeData.id);

	recipeToUpdate.name = recipeData.name;
	recipeToUpdate.ingredients = recipeData.ingredients;

	return await recipeToUpdate.save();
};

const deleteById = async (id) => {
	const recipeToDelete = Recipe.findById(id);

	return await recipeToDelete.remove();
};

module.exports = {
	getAll,
	getById,
	getByName,
	add,
	updateById,
	deleteById,
};
