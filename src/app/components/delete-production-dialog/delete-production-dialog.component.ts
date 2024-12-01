import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CookieProduction } from '../../interfaces/production.interface';

@Component({
  selector: 'app-delete-production-dialog',
  templateUrl: './delete-production-dialog.component.html',
  styleUrl: './delete-production-dialog.component.css',
})
export class DeleteProductionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteProductionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cookie: CookieProduction }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
