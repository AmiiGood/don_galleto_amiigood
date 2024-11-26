import { Component, OnInit } from '@angular/core';
import { Cookie } from '../../interfaces/cookie.interface';
import { CookiesService } from '../../services/cookies.service';
import { Router } from '@angular/router';
import { ProductionService } from '../../services/production.service';

@Component({
  selector: 'app-cookies-main',
  templateUrl: './cookies-main.component.html',
  styleUrl: './cookies-main.component.css',
})
export class CookiesMainComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'name',
    'description',
    'stock',
    'status',
  ];
  public cookies!: Cookie[];
  selectedCookie: Cookie | null = null;

  constructor(
    private cookiesService: CookiesService,
    private productionService: ProductionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCookies();
  }

  loadCookies() {
    this.cookiesService.getAllCookies().subscribe({
      next: (response) => {
        this.cookies = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getStatusClass(status: string): string {
    return status === 'Existencia' ? 'status-success' : 'status-error';
  }

  openProduccionComponent() {
    if (!this.selectedCookie) {
      alert('Por favor selecciona una galleta para producir');
      return;
    }

    if (
      this.cookiesService.checkIngredientsAvailability(
        this.selectedCookie.recipeId
      )
    ) {
      this.productionService.addCookieToProduction(this.selectedCookie);
      this.router.navigate(['/produccion']);
    } else {
      alert('No hay suficientes ingredientes para producir esta galleta');
    }
  }

  onCookieSelect(cookie: Cookie) {
    this.selectedCookie = cookie;
  }
}
