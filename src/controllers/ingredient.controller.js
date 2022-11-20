const {
	getAllIngredients,
	getIngredientById,
	getIngredientByName,
	addIngredient,
	updateIngredientById,
	deleteIngredientById,
} = require('../services/ingredient.service');

const getIngredients = async (req, res, next) => {
	await getAllIngredients()
		.then((ingredients) => {
			return res.json(ingredients);
		})
		.catch((error) => {
			return next(error);
		});
};

module.exports = {
	getIngredients,
};
