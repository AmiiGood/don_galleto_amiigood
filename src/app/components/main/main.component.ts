import { Component } from '@angular/core';
import { MenuInterface, MenuItems } from '../../interfaces/menu.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  menuItems: MenuInterface[] = MenuItems;
}
