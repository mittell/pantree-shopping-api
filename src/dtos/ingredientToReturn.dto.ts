import { MappingError } from '../types/error.types';

export class IngredientToReturnDto {
	name!: string;
	measurement!: string;

	mapFromResult(ingredient: any) {
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
