import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './Frontend/login/login';
import { Schools } from "./Frontend/schools/schools";
import { Users } from './Frontend/users/users';
import { Students } from './Frontend/students/students';
import { Teachers } from './Frontend/teachers/teachers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Schools, Students, Teachers, Users],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('desafio-estagio-app');
}
