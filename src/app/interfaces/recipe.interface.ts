export interface RecipeIngredient {
  ingredientId: number;
  quantity: number;
}

export interface Recipe {
  id: number;
  name: string;
  ingredients: RecipeIngredient[];
  yield: number;
  instructions: string[];
}
