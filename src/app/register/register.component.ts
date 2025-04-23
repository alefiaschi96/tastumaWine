import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private serviceService: ServiceService
  ) {}

  ngOnInit(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Inserisci email e password';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const role = this.isAdmin ? 'admin' : 'user';

    this.serviceService.createUser(this.email, this.password, role).subscribe({
      next: (response: any) => {
        console.log(response)
        if (response && response.id) {
          this.successMessage = "Registrazione completata con successo.";
        } else {
          this.errorMessage = 'Si è verificato un errore imprevisto durante la registrazione';
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        this.errorMessage = error.message || 'Si è verificato un errore durante la registrazione';
        this.isLoading = false;
      }
    });
  }
}
