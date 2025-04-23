import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    // Utilizziamo l'observable userState$ per verificare le autorizzazioni
    return this.authService.userState$.pipe(
      take(1), // Prendiamo solo il valore corrente
      map((state) => {
        // Verifichiamo se l'utente ha il permesso 'admin'
        if (state.permission === 'admin') {
          return true;
        } else {
          // Reindirizza alla lista vini se non ha i permessi
          console.log('Accesso negato: permessi insufficienti');
          return this.router.parseUrl('/wine-list');
        }
      })
    );
  }
}
