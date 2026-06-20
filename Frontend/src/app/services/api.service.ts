import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // URL base do seu Backend
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Monta o cabeçalho com o Token JWT salvo no localStorage
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // ── LOGIN ──────────────────────────────────────────
  login(cpf: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { CPF: cpf, password });
  }

  // ── USUÁRIOS ───────────────────────────────────────
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, data);
  }

  // ── ESCOLAS ────────────────────────────────────────
  getSchools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/schools`, { headers: this.getHeaders() });
  }

  createSchool(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/schools`, data, { headers: this.getHeaders() });
  }

  // ── PROFESSORES ────────────────────────────────────
  getTeachers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/teachers`, { headers: this.getHeaders() });
  }

  createTeacher(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/teachers`, data, { headers: this.getHeaders() });
  }

  // ── ALUNOS ─────────────────────────────────────────
  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/students`, { headers: this.getHeaders() });
  }

  createStudent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, data, { headers: this.getHeaders() });
  }
}
