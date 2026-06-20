import { Routes } from '@angular/router';
import { Login }    from './login/login';
import { Users }    from './users/users';
import { Schools }  from './schools/schools';
import { Teachers } from './teachers/teachers';
import { Students } from './students/students';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '',        component: Login },
  { path: 'login',   component: Login },
  { path: 'register', component: Users },

  // Rotas protegidas — só acessíveis após login
  { path: 'schools',  component: Schools,  canActivate: [authGuard] },
  { path: 'teachers', component: Teachers, canActivate: [authGuard] },
  { path: 'students', component: Students, canActivate: [authGuard] },

  // Qualquer rota inválida redireciona ao login
  { path: '**', redirectTo: 'login' }
];
