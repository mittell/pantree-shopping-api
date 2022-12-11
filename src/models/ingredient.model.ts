import { Schema, model } from 'mongoose';

interface IIngredient {
	name: string;
	measurement: string;
}

const ingredientSchema = new Schema<IIngredient>({
	name: { type: String, required: true },
	measurement: { type: String, required: true },
});

export default model<IIngredient>('Ingredient', ingredientSchema);
