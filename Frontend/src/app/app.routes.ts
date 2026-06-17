import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Schools } from './schools/schools';
import { Students } from './students/students';
import { Teachers } from './teachers/teachers';
import { Users } from './users/users';

export const routes: Routes = [
  {
    path: "",
    component: Login
  },
  {
    path: "login",
    component: Login
  },
  {
    path: "schools",
    component: Schools
  },
  {
    path: "students",
    component: Students
  },
  {
    path: "teachers",
    component: Teachers
  },
  {
    path: "users",
    component: Users
  }
];
