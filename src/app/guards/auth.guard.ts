import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CuentasService } from '../../services/cuentas.service';


export const adminGuard: CanActivateFn = (route, state) => {
  const cuentasService = inject(CuentasService);
  const router = inject(Router);

  if (cuentasService.isLoggedIn() && cuentasService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
