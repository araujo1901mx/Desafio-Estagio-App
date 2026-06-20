import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  name     = '';
  cpf      = '';
  password = '';
  birthday = '';
  erro     = '';
  sucesso  = '';
  loading  = false;

  constructor(private api: ApiService, private router: Router) {}

  onSubmit() {
    this.erro    = '';
    this.sucesso = '';
    this.loading = true;

    this.api.createUser({
      name: this.name,
      CPF: this.cpf,
      password: this.password,
      birthday: this.birthday
    }).subscribe({
      next: () => {
        this.sucesso = 'Cadastro realizado! Redirecionando para o login...';
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        const erros = err.error?.erros;
        this.erro   = erros ? erros.join(' | ') : (err.error?.error || 'Erro ao cadastrar.');
        this.loading = false;
      }
    });
  }
}
