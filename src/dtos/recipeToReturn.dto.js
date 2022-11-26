const { MappingError } = require('../helpers/errors.js');

class RecipeToReturnDto {
	mapFromResult(recipe) {
		let name = recipe.name;
		let ingredients = recipe.ingredients;

		if (
			name === null ||
			name === undefined ||
			name === '' ||
			ingredients.length === 0
		) {
			throw new MappingError('Unable to map and return Recipe data');
		}

		this.name = name;
		this.ingredients = this.mapIngredientsListFromResult(recipe.ingredients);

		return this;
	}

	mapIngredientsListFromResult(ingredients) {
		let ingredientsToReturn = [];

		for (const item of ingredients) {
			if (
				item.amount === null ||
				item.amount === undefined ||
				item.amount === '' ||
				item.ingredient.name === null ||
				item.ingredient.name === undefined ||
				item.ingredient.name === '' ||
				item.ingredient.measurement === null ||
				item.ingredient.measurement === undefined ||
				item.ingredient.measurement === ''
			) {
				throw new MappingError('Unable to map and return Recipe data');
			}

			ingredientsToReturn.push({
				name: item.ingredient.name,
				measurement: item.ingredient.measurement,
				amount: item.amount,
			});
		}

		return ingredientsToReturn;
	}
}

module.exports = RecipeToReturnDto;
