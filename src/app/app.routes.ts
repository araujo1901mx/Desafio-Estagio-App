import { Routes } from '@angular/router';
import { Login } from './Frontend/login/login';
import { Schools } from './Frontend/schools/schools';
import { Students } from './Frontend/students/students';
import { Teachers } from './Frontend/teachers/teachers';
import { Users } from './Frontend/users/users';

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
