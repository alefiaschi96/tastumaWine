import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-headbar',
  templateUrl: './headbar.component.html',
  styleUrls: ['./headbar.component.css'],
})
export class HeadbarComponent implements OnInit, OnDestroy {
  public isMenuCollapsed: boolean = true;
  public permission: string | null = null;
  public isAuthenticated: boolean = false;
  private userStateSubscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Sottoscrizione allo stato dell'utente
    this.userStateSubscription = this.authService.userState$.subscribe(state => {
      this.permission = state.permission;
      this.isAuthenticated = state.isAuthenticated;
    });
  }

  ngOnDestroy(): void {
    // Pulizia della sottoscrizione quando il componente viene distrutto
    if (this.userStateSubscription) {
      this.userStateSubscription.unsubscribe();
    }
  }

  logout() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.authService.signOut();
  }
}
