import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redirect to wine-list if already logged in
    this.authService.getSession().then(({ data }) => {
      if (data && data.session) {
        this.router.navigate(['/wine-list']);
      }
    });
  }

  async onSubmit(): Promise<void> {
    if (!this.email || !this.password) {
      this.errorMessage = 'Inserisci email e password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Attempt to sign in
      const { data, error } = await this.authService.signIn(this.email, this.password);

      if (error) {
        this.errorMessage = error.message || 'Errore durante il login';
      } else if (data && data.user) {
        // Attendiamo che lo stato dell'utente sia aggiornato con i permessi
        // Utilizziamo take(1) per prendere solo il primo stato in cui isAuthenticated = true
        // e poi completare automaticamente la sottoscrizione
        const subscription = this.authService.userState$.subscribe(state => {
          // Verifichiamo che lo stato sia aggiornato (isAuthenticated = true)
          if (state.isAuthenticated) {
            // Reindirizzamento dopo che lo stato è stato aggiornato
            this.router.navigate(['/wine-list']);
            // Annulliamo la sottoscrizione per evitare memory leak
            subscription.unsubscribe();
          }
        });
      }
    } catch (err: any) {
      this.errorMessage = err.message || 'Si è verificato un errore durante il login';
    } finally {
      this.isLoading = false;
    }
  }
}
