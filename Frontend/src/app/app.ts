import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';
import { Schools } from "./schools/schools";
import { Users } from './users/users';
import { Students } from './students/students';
import { Teachers } from './teachers/teachers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Schools, Students, Teachers, Users],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('desafio-estagio-app');
}
