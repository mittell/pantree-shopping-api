const { MappingError } = require('../helpers/errors.js');

class IngredientToReturnDto {
	mapFromResult(ingredient) {
		let name = ingredient.name;
		let measurement = ingredient.measurement;

		if (
			name === null ||
			name === undefined ||
			name === '' ||
			measurement === null ||
			measurement === undefined ||
			measurement === ''
		) {
			throw new MappingError('Unable to map and return Ingredient data');
		}

		this.name = name;
		this.measurement = measurement;

		return this;
	}
}

module.exports = IngredientToReturnDto;
