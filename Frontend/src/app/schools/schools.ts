import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './schools.html',
  styleUrl: './schools.css'
})
export class Schools implements OnInit {
  schools: any[] = [];
  name    = '';
  address = '';
  erro    = '';
  sucesso = '';
  loading = false;
  userName = localStorage.getItem('userName') || '';

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadSchools();
  }

  loadSchools() {
    this.api.getSchools().subscribe({
      next:  (data) => this.schools = data,
      error: (err)  => this.erro = err.error?.error || 'Erro ao carregar escolas.'
    });
  }

  onSubmit() {
    this.erro    = '';
    this.sucesso = '';
    this.loading = true;

    this.api.createSchool({ name: this.name, address: this.address }).subscribe({
      next: (novaEscola) => {
        this.sucesso = 'Escola cadastrada com sucesso!';
        this.name = this.address = '';
        this.loading = false;
        this.schools.push(novaEscola);
      },
      error: (err) => {
        const erros = err.error?.erros;
        this.erro   = erros ? erros.join(' | ') : (err.error?.error || 'Erro ao cadastrar escola.');
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
