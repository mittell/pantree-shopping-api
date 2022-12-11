import { Schema, model, Types } from 'mongoose';

interface IRecipe {
	name: string;
	ingredients: {
		ingredient: Types.ObjectId;
		amount: Number;
	};
}

const recipeSchema = new Schema<IRecipe>({
	name: { type: String, required: true },
	ingredients: [
		{
			ingredient: {
				type: Types.ObjectId,
				ref: 'Ingredient',
			},
			amount: {
				type: Number,
				required: true,
			},
			_id: false,
		},
	],
});

export default model<IRecipe>('Recipe', recipeSchema);
