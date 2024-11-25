import { Recipe } from '../interfaces/recipe.interface';

export const RECIPES: Recipe[] = [
  {
    id: 1,
    name: 'Galleta Chocolate Clásica',
    ingredients: [
      { ingredientId: 1, quantity: 100 },
      { ingredientId: 2, quantity: 50 },
      { ingredientId: 5, quantity: 30 },
    ],
    yield: 12,
    instructions: [
      'Mezclar ingredientes secos',
      'Agregar ingredientes húmedos',
      'Hornear a 180°C por 12 minutos',
    ],
  },
  {
    id: 2,
    name: 'Galleta de Avena',
    ingredients: [
      { ingredientId: 1, quantity: 120 },
      { ingredientId: 2, quantity: 40 },
      { ingredientId: 8, quantity: 20 },
    ],
    yield: 10,
    instructions: [
      'Combinar ingredientes secos',
      'Añadir avena y mantequilla',
      'Hornear a 175°C por 15 minutos',
    ],
  },
  {
    id: 3,
    name: 'Galleta de Mantequilla',
    ingredients: [
      { ingredientId: 1, quantity: 150 },
      { ingredientId: 3, quantity: 80 },
      { ingredientId: 2, quantity: 70 },
    ],
    yield: 15,
    instructions: [
      'Batir mantequilla con azúcar',
      'Incorporar harina',
      'Hornear a 170°C por 10 minutos',
    ],
  },
  {
    id: 4,
    name: 'Galleta con Canela',
    ingredients: [
      { ingredientId: 1, quantity: 140 },
      { ingredientId: 2, quantity: 60 },
      { ingredientId: 9, quantity: 10 },
    ],
    yield: 16,
    instructions: [
      'Mezclar harina, azúcar y canela',
      'Formar la masa',
      'Hornear a 180°C por 12 minutos',
    ],
  },
  {
    id: 5,
    name: 'Galleta de Cacao',
    ingredients: [
      { ingredientId: 1, quantity: 130 },
      { ingredientId: 2, quantity: 50 },
      { ingredientId: 8, quantity: 30 },
    ],
    yield: 12,
    instructions: [
      'Tamizar cacao con harina',
      'Agregar azúcar y líquidos',
      'Hornear a 180°C por 10 minutos',
    ],
  },
  {
    id: 6,
    name: 'Galleta Vegana',
    ingredients: [
      { ingredientId: 1, quantity: 100 },
      { ingredientId: 2, quantity: 40 },
      { ingredientId: 6, quantity: 50 },
    ],
    yield: 10,
    instructions: [
      'Combinar harina y azúcar',
      'Agregar leche vegetal',
      'Hornear a 180°C por 15 minutos',
    ],
  },
  {
    id: 7,
    name: 'Galleta de Chispas Dobles',
    ingredients: [
      { ingredientId: 1, quantity: 110 },
      { ingredientId: 5, quantity: 50 },
      { ingredientId: 7, quantity: 5 },
    ],
    yield: 14,
    instructions: [
      'Incorporar chispas a la mezcla',
      'Formar bolitas',
      'Hornear a 175°C por 10 minutos',
    ],
  },
  {
    id: 8,
    name: 'Galleta de Limón',
    ingredients: [
      { ingredientId: 1, quantity: 120 },
      { ingredientId: 2, quantity: 50 },
      { ingredientId: 7, quantity: 10 },
    ],
    yield: 12,
    instructions: [
      'Añadir ralladura de limón a la masa',
      'Mezclar y hornear',
      'Hornear a 180°C por 12 minutos',
    ],
  },
  {
    id: 9,
    name: 'Galleta Salada',
    ingredients: [
      { ingredientId: 1, quantity: 150 },
      { ingredientId: 3, quantity: 70 },
      { ingredientId: 10, quantity: 5 },
    ],
    yield: 16,
    instructions: [
      'Combinar ingredientes secos',
      'Agregar mantequilla',
      'Hornear a 170°C por 12 minutos',
    ],
  },
  {
    id: 10,
    name: 'Galleta de Almendra',
    ingredients: [
      { ingredientId: 1, quantity: 120 },
      { ingredientId: 2, quantity: 40 },
      { ingredientId: 3, quantity: 60 },
    ],
    yield: 14,
    instructions: [
      'Incorporar almendra molida a la mezcla',
      'Formar bolitas',
      'Hornear a 180°C por 10 minutos',
    ],
  },
];
