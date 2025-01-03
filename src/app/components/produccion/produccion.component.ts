import { Component, OnInit } from '@angular/core';
import {
  CookieProduction,
  ProductionStatus,
  ProductionStatusType,
} from '../../interfaces/production.interface';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProductionService } from '../../services/production.service';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialogComponent } from '../recipe-dialog/recipe-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DeleteProductionDialogComponent } from '../delete-production-dialog/delete-production-dialog.component';

@Component({
  selector: 'app-produccion',
  templateUrl: './produccion.component.html',
  styleUrl: './produccion.component.css',
})
export class ProduccionComponent implements OnInit {
  dialogWidth = window.innerWidth <= 600 ? '90vw' : '450px';
  productionStatus: ProductionStatus = {
    preparacion: [],
    horneado: [],
    enfriamiento: [],
    lista: [],
  };

  constructor(
    private productionService: ProductionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.productionService.getProductionStatus().subscribe((status) => {
      this.productionStatus = status;
    });
  }

  showRecipe(cookie: CookieProduction) {
    const recipe = this.productionService.getRecipe(cookie.recipeId);
    if (recipe) {
      this.dialog.open(RecipeDialogComponent, {
        width: '500px',
        data: { cookie, recipe },
      });
    }
  }

  async drop(event: CdkDragDrop<CookieProduction[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const cookie = event.previousContainer.data[event.previousIndex];
      const newStatus = event.container.id as ProductionStatusType;

      if (newStatus === 'lista') {
        const recipe = this.productionService.getRecipe(cookie.recipeId);
        if (recipe) {
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '400px',
            data: { cookie, recipe },
          });

          const result = await dialogRef.afterClosed().toPromise();
          if (result) {
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex
            );
            this.productionService.completeCookieProduction(cookie);
          }
        }
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.productionService.updateCookieStatus(cookie, newStatus);
      }
    }
  }

  async deleteCookieProduction(cookie: CookieProduction) {
    const dialogRef = this.dialog.open(DeleteProductionDialogComponent, {
      width: '400px',
      data: { cookie },
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      this.productionService.deleteCookieFromProduction(cookie);
    }
  }
}
