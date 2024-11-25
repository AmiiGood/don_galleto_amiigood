export interface Cookie {
  id: number;
  name: string;
  recipeId: number;
  description: string;
  image: string;
  price: {
    unit: number;
    package500g: number;
    package1000g: number;
    pricePerGram: number;
  };
  stock: number;
  weightPerUnit: number;
}
