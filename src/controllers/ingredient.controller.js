const {
	getAll,
	getById,
	getByName,
	add,
	updateById,
	deleteById,
} = require('../services/ingredient.service');

const getAllIngredients = async (req, res, next) => {
	await getAll()
		.then((ingredients) => {
			return res.json(ingredients);
		})
		.catch((error) => {
			return next(error);
		});
};

const getIngredientById = async (req, res, next) => {
	const { id } = req.params;

	await getById(id)
		.then((ingredient) => {
			return res.json(ingredient);
		})
		.catch((error) => {
			return next(error);
		});
};

const getIngredientByName = async (req, res, next) => {
	const { name } = req.params;

	await getByName(name)
		.then((ingredient) => {
			return res.json(ingredient);
		})
		.catch((error) => {
			return next(error);
		});
};

const addIngredient = async (req, res, next) => {
	const ingredientData = req.body;

	await add(ingredientData)
		.then((ingredient) => {
			return res.json(ingredient);
		})
		.catch((error) => {
			return next(error);
		});
};

const updateIngredientById = async (req, res, next) => {
	const ingredientData = req.body;

	await updateById(ingredientData)
		.then((ingredient) => {
			return res.json(ingredient);
		})
		.catch((error) => {
			return next(error);
		});
};

const deleteIngredientById = async (req, res, next) => {
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
	getAllIngredients,
	getIngredientById,
	getIngredientByName,
	addIngredient,
	updateIngredientById,
	deleteIngredientById,
};
