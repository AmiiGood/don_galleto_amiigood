export interface Ingredient {
  id: number;
  name: string;
  stock: number;
  unit: 'g' | 'ml' | 'unidades';
  minimumStock: number;
  cost: number;
}
