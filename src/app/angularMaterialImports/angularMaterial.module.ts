import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatRadioModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
})
export class AngularMaterialModule {}
