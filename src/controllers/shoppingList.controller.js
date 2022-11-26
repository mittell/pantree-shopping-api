const { generate } = require('../services/shoppingList.service');

const generateShoppingList = async (req, res, next) => {
	const { recipeIds } = req.body;

	const result = await generate(recipeIds)
		.then((shoppingList) => {
			return res.json(shoppingList);
		})
		.catch((error) => {
			return next(error);
		});

	res.json(result);
};

module.exports = {
	generateShoppingList,
};
