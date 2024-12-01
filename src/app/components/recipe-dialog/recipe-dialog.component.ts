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

  printRecipe(): void {
    // Crear elemento para imprimir
    const printContent = document.createElement('div');
    printContent.classList.add('recipe-print-content');

    // Añadir contenido de la receta
    printContent.innerHTML = `
      <div class="print-header">
        <h1>${this.data.cookie.name}</h1>
      </div>

      <div class="print-section">
        <h2>Ingredientes</h2>
        <ul>
          ${this.ingredientsWithNames
            .map((ing) => `<li>${ing.name}: ${ing.quantity} ${ing.unit}</li>`)
            .join('')}
        </ul>
      </div>

      <div class="print-section">
        <h2>Instrucciones</h2>
        <ol>
          ${this.data.recipe.instructions
            .map((instruction) => `<li>${instruction}</li>`)
            .join('')}
        </ol>
      </div>

      <div class="print-footer">
        <p>Rendimiento: ${this.data.recipe.yield} unidades</p>
      </div>
    `;

    // Crear iframe oculto para imprimir
    const printFrame = document.createElement('iframe');
    printFrame.style.position = 'absolute';
    printFrame.style.left = '-9999px';
    document.body.appendChild(printFrame);

    // Añadir estilos y contenido al iframe
    const frameDoc =
      printFrame.contentDocument || printFrame.contentWindow?.document;
    if (frameDoc) {
      frameDoc.open();
      frameDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${this.data.cookie.name} - Receta</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
              }

              .print-header {
                text-align: center;
                border-bottom: 2px solid #333;
                margin-bottom: 20px;
                padding-bottom: 10px;
              }

              .print-section {
                margin-bottom: 25px;
              }

              h1 {
                color: #2196f3;
                margin: 0 0 10px 0;
              }

              h2 {
                color: #424242;
                font-size: 1.2em;
                margin: 0 0 10px 0;
              }

              ul, ol {
                margin: 0;
                padding-left: 25px;
              }

              li {
                margin-bottom: 8px;
              }

              .print-footer {
                margin-top: 30px;
                padding-top: 10px;
                border-top: 1px solid #ccc;
                font-style: italic;
              }

              @media print {
                body {
                  padding: 0;
                }

                .print-header {
                  margin-top: 0;
                }
              }
            </style>
          </head>
          <body>${printContent.innerHTML}</body>
        </html>
      `);
      frameDoc.close();

      // Esperar a que los estilos se carguen y luego imprimir
      setTimeout(() => {
        printFrame.contentWindow?.print();
        // Eliminar el iframe después de imprimir
        setTimeout(() => {
          document.body.removeChild(printFrame);
        }, 100);
      }, 250);
    }
  }
}
