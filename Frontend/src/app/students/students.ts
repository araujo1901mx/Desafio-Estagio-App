import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students implements OnInit {
  students:   any[] = [];
  teachers:   any[] = [];
  name       = '';
  cpf        = '';
  birthday   = '';
  teacher_id = '';
  erro       = '';
  sucesso    = '';
  loading    = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadStudents();
    this.api.getTeachers().subscribe({ next: (data) => this.teachers = data });
  }

  loadStudents() {
    this.api.getStudents().subscribe({
      next:  (data) => this.students = data,
      error: (err)  => this.erro = err.error?.error || 'Erro ao carregar alunos.'
    });
  }

  onSubmit() {
    this.erro    = '';
    this.sucesso = '';
    this.loading = true;

    this.api.createStudent({
      name: this.name, CPF: this.cpf,
      birthday: this.birthday, teacher_id: this.teacher_id
    }).subscribe({
      next: (novoAluno) => {
        this.sucesso  = 'Aluno cadastrado com sucesso!';
        this.name = this.cpf = this.birthday = this.teacher_id = '';
        this.loading = false;
        const profEscolhido = this.teachers.find(t => t.id === this.teacher_id);
        novoAluno.teacher = profEscolhido;
        this.students.push(novoAluno);
      },
      error: (err) => {
        const erros = err.error?.erros;
        this.erro   = erros ? erros.join(' | ') : (err.error?.error || 'Erro ao cadastrar aluno.');
        this.loading = false;
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
