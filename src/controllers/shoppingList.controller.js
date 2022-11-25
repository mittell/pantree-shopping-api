const { getById } = require('../services/recipe.service');

const generateShoppingList = async (req, res, next) => {
	const { recipeIds } = req.body;

	let allIngredients = [];

	for (const id of recipeIds) {
		const recipe = await getById(id);

		allIngredients.push(...recipe.ingredients);
	}

	const result = Object.values(
		allIngredients.reduce((acc, { name, amount, measurement }) => {
			acc[name] = {
				name,
				amount: (acc[name] ? acc[name].amount : 0) + amount,
				measurement,
			};
			return acc;
		}, {})
	);

	res.json(result);
};

module.exports = {
	generateShoppingList,
};
