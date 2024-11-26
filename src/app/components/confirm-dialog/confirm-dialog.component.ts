import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieProduction } from '../../interfaces/production.interface';
import { Recipe } from '../../interfaces/recipe.interface';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  recipeYield: number;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cookie: CookieProduction;
      recipe: Recipe;
    },
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {
    this.recipeYield = data.recipe.yield;
  }
}
