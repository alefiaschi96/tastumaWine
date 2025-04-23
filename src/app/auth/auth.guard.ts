import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Utilizziamo l'observable userState$ dell'AuthService
    return this.authService.userState$.pipe(
      take(1), // Prendiamo solo il valore corrente
      map(state => {
        // Verifichiamo se l'utente è autenticato
        if (state.isAuthenticated) {
          return true;
        } else {
          // Reindirizza al login se non è autenticato
          return this.router.parseUrl('/login');
        }
      })
    );
  }
}
