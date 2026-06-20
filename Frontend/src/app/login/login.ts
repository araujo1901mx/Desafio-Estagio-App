import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  cpf      = '';
  password = '';
  erro     = '';
  loading  = false;

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.erro    = '';
    this.loading = true;

    this.api.login(this.cpf, this.password).subscribe({
      next: (res) => {
        // Salva o token no navegador
        localStorage.setItem('token', res.token);
        localStorage.setItem('userName', res.user.name);
        this.router.navigate(['/schools']); // Redireciona para a tela principal
      },
      error: (err) => {
        this.erro    = err.error?.error || 'Erro ao fazer login.';
        this.loading = false;
      }
    });
  }
}
