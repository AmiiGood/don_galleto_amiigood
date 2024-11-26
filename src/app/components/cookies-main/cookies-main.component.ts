import { Component, OnInit } from '@angular/core';
import { Cookie } from '../../interfaces/cookie.interface';
import { CookiesService } from '../../services/cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cookies-main',
  templateUrl: './cookies-main.component.html',
  styleUrl: './cookies-main.component.css',
})
export class CookiesMainComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'stock', 'status'];
  public cookies!: Cookie[];

  constructor(private cookiesService: CookiesService, private router: Router) {}

  ngOnInit(): void {
    this.loadCookies();
  }

  loadCookies() {
    this.cookiesService.getAllCookies().subscribe({
      next: (response) => {
        this.cookies = response;
        console.log(this.cookies);
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
    this.router.navigate(['/produccion']);
  }
}
