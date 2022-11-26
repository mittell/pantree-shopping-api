const { getById } = require('../services/recipe.service');

const generate = async (recipeIds) => {
	let allIngredients = [];

	for (const id of recipeIds) {
		const recipe = await getById(id);

		allIngredients.push(...recipe.ingredients);
	}

	const result = Object.values(
		allIngredients.reduce((acc, { amount, name, measurement }) => {
			acc[name] = {
				name,
				amount: (acc[name] ? acc[name].amount : 0) + amount,
				measurement,
			};
			return acc;
		}, {})
	);

	return result;
};

module.exports = {
	generate,
};
