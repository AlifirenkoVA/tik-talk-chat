import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceprot: HttpInterceptorFn = (req, next) => {
  console.log(req);
  return next(req);
};
