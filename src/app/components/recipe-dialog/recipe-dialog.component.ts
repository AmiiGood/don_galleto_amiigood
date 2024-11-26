import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cookie } from '../../interfaces/cookie.interface';
import { Recipe } from '../../interfaces/recipe.interface';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-recipe-dialog',
  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.css',
})
export class RecipeDialogComponent {
  ingredientsWithNames: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cookie: Cookie; recipe: Recipe },
    private productionService: ProductionService
  ) {
    this.ingredientsWithNames = this.data.recipe.ingredients.map((ing) => ({
      ...ing,
      ...this.productionService.getIngredientInfo(ing.ingredientId),
    }));
  }
}
