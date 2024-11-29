import { Component, ViewChild } from '@angular/core';
import { MenuInterface, MenuItems } from '../../interfaces/menu.interface';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  menuItems: MenuInterface[] = MenuItems;
  isExpanded = true;

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
    // Forzar actualización del layout
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
