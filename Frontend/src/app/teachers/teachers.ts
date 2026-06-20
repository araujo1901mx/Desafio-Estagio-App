import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css'
})
export class Teachers implements OnInit {
  teachers: any[] = [];
  schools:  any[] = [];
  name      = '';
  cpf       = '';
  password  = '';
  birthday  = '';
  school_id = '';
  erro      = '';
  sucesso   = '';
  loading   = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadTeachers();
    // Carrega a lista de escolas para o <select>
    this.api.getSchools().subscribe({ next: (data) => this.schools = data });
  }

  loadTeachers() {
    this.api.getTeachers().subscribe({
      next:  (data) => this.teachers = data,
      error: (err)  => this.erro = err.error?.error || 'Erro ao carregar professores.'
    });
  }

  onSubmit() {
    this.erro    = '';
    this.sucesso = '';
    this.loading = true;

    this.api.createTeacher({
      name: this.name, CPF: this.cpf,
      password: this.password, birthday: this.birthday,
      school_id: this.school_id
    }).subscribe({
      next: (novoProfessor) => {
        this.sucesso  = 'Professor cadastrado com sucesso!';
        this.name = this.cpf = this.password = this.birthday = this.school_id = '';
        this.loading = false;
        // Para a listagem funcionar perfeitamente sem recarregar do banco, precisamos simular o "include"
        novoProfessor.user = { name: this.name, CPF: this.cpf };
        const escolaEscolhida = this.schools.find(s => s.id === this.school_id);
        novoProfessor.school = escolaEscolhida;
        this.teachers.push(novoProfessor);
      },
      error: (err) => {
        const erros = err.error?.erros;
        this.erro   = erros ? erros.join(' | ') : (err.error?.error || 'Erro ao cadastrar professor.');
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
