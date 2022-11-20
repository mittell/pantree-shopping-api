const {
	getAll,
	getById,
	getByName,
	add,
	updateById,
	deleteById,
} = require('../services/recipe.service');

const getAllRecipes = async (req, res, next) => {
	await getAll()
		.then((recipes) => {
			return res.json(recipes);
		})
		.catch((error) => {
			return next(error);
		});
};

const getRecipeById = async (req, res, next) => {
	const { id } = req.params;

	await getById(id)
		.then((recipe) => {
			return res.json(recipe);
		})
		.catch((error) => {
			return next(error);
		});
};

const getRecipeByName = async (req, res, next) => {
	const { name } = req.params;

	await getByName(name)
		.then((recipe) => {
			return res.json(recipe);
		})
		.catch((error) => {
			return next(error);
		});
};

const addRecipe = async (req, res, next) => {
	const recipeData = req.body;

	await add(recipeData)
		.then((recipe) => {
			return res.json(recipe);
		})
		.catch((error) => {
			return next(error);
		});
};

const updateRecipeById = async (req, res, next) => {
	const recipeData = req.body;

	await updateById(recipeData)
		.then((recipe) => {
			return res.json(recipe);
		})
		.catch((error) => {
			return next(error);
		});
};

const deleteRecipeById = async (req, res, next) => {
	const { id } = req.params;

	await deleteById(id)
		.then(() => {
			return res.sendStatus(200);
		})
		.catch((error) => {
			return next(error);
		});
};

module.exports = {
	getAllRecipes,
	getRecipeById,
	getRecipeByName,
	addRecipe,
	updateRecipeById,
	deleteRecipeById,
};
