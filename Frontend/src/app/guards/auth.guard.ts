import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Tem token → deixa passar
  }

  // Sem token → manda para o login
  router.navigate(['/login']);
  return false;
};
