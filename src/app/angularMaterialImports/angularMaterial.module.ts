import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [],
})
export class AngularMaterialModule {}
