import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const user = accountService.currentUser();
  if (user){
    req = req.clone({
      setHeaders: {
        Authorization: 'bearer ${user.token}'
      }
    })
  }
  return next(req);
};
