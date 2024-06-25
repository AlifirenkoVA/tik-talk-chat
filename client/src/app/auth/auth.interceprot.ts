import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

let isRefreshing = false;

export const authTokenInterceprot: HttpInterceptorFn = (req, next) => {
  const authservice = inject(AuthService);
  const token = authservice.token;

  if (!token) return next(req);

  if (!isRefreshing) {
    return refreshAndProceed(authservice, req, next);
  }

  return next(addToken(token, req)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProceed(authservice, req, next);
      }

      return throwError(() => error);
    }),
  );
};

const refreshAndProceed = (
  authservice: AuthService,
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  if (!isRefreshing) {
    isRefreshing = true;

    return authservice.refreshAuthToken().pipe(
      switchMap((res) => {
        isRefreshing = false;
        return next(addToken(res.access_token, req));
      }),
    );
  }

  return next(addToken(authservice.token, req));
};

const addToken = (token: string | null, req: HttpRequest<unknown>) => {
  if (!token) return req;
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
