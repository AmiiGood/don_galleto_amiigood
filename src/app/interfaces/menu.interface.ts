export interface MenuInterface {
  label: string;
  icon: string;
  route: string[];
}

export const MenuItems: MenuInterface[] = [
  {
    label: 'Ventas',
    icon: 'shopping_bag',
    route: ['/ventas'],
  },
  {
    label: 'Galletas',
    icon: 'inventory_2',
    route: ['/cookies'],
  },
];
