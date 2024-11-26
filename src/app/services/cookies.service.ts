import { Injectable } from '@angular/core';
import { Cookie } from '../interfaces/cookie.interface';
import { COOKIES } from '../mocks/cookies.mock';
import { delay, Observable, of } from 'rxjs';
import { Recipe } from '../interfaces/recipe.interface';
import { Ingredient } from '../interfaces/ingredient.interface';
import { RECIPES } from '../mocks/recipes.mock';
import { INGREDIENTS } from '../mocks/ingredients.mock';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private cookies: Cookie[] = COOKIES;
  private recipes: Recipe[] = RECIPES;
  private ingredients: Ingredient[] = INGREDIENTS;

  constructor() {}

  getAllCookies(): Observable<Cookie[]> {
    return of(this.cookies).pipe(delay(300));
  }

  getRecipeById(recipeId: number): Recipe | undefined {
    return this.recipes.find((recipe) => recipe.id === recipeId);
  }

  updateIngredientStock(ingredientId: number, quantity: number): void {
    const ingredient = this.ingredients.find((ing) => ing.id === ingredientId);
    if (ingredient) {
      ingredient.stock += quantity;

      // Verificar si el stock está por debajo del mínimo
      if (ingredient.stock < ingredient.minimumStock) {
        console.warn(
          `¡Advertencia! El ingrediente ${ingredient.name} está por debajo del stock mínimo`
        );
      }
    }
  }

  getIngredientStock(ingredientId: number): number {
    const ingredient = this.ingredients.find((ing) => ing.id === ingredientId);
    return ingredient ? ingredient.stock : 0;
  }

  checkIngredientsAvailability(recipeId: number): boolean {
    const recipe = this.getRecipeById(recipeId);
    if (!recipe) return false;

    return recipe.ingredients.every((ingredient) => {
      const stock = this.getIngredientStock(ingredient.ingredientId);
      return stock >= ingredient.quantity;
    });
  }
  
  updateCookieStock(cookieId: number, quantity: number): void {
    const cookie = this.cookies.find((c) => c.id === cookieId);
    if (cookie) {
      cookie.stock += quantity;
    }
  }

  updateCookieStatus(cookieId: number, newStatus: string): void {
    const cookie = this.cookies.find((c) => c.id === cookieId);
    if (cookie) {
      cookie.status = newStatus;
    }
  }

  getIngredientInfo(ingredientId: number): Ingredient | undefined {
    return this.ingredients.find((ing) => ing.id === ingredientId);
  }
}
