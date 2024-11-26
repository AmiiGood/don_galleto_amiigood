import { Injectable } from '@angular/core';
import { Cookie } from '../interfaces/cookie.interface';
import { COOKIES } from '../mocks/cookies.mock';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  private cookies: Cookie[] = COOKIES;

  constructor() {}

  getAllCookies(): Observable<Cookie[]> {
    return of(this.cookies).pipe(delay(300));
  }

  
}
