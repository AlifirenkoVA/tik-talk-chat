import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap, throwError } from 'rxjs';
import { UrlHelperService } from '../data/services/urlHelper.service';
import { TokenResponse } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string | null = null;
  refreshToken: string | null = null;
  coockieService: CookieService;

  constructor(
    private http: HttpClient,
    private urls: UrlHelperService,
    private router: Router,
    @Inject(CookieService) coockieService: CookieService,
  ) {
    this.http = http;
    this.urls = urls;
    this.coockieService = coockieService;
  }

  get isAuth() {
    if (!this.token) {
      this.token = this.coockieService.get('token');
      this.refreshToken = this.coockieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: { username: string; password: string }) {
    const fordData = new FormData();

    fordData.append('username', payload.username);
    fordData.append('password', payload.password);

    return this.http
      .post<TokenResponse>(
        `${this.urls.getBaseUrl()}${this.urls.getAuthLoginUrl()}`,
        fordData,
      )
      .pipe(tap((val) => this.saveTokens(val)));
  }

  refreshAuthToken() {
    return this.http
      .post<TokenResponse>(
        `${this.urls.getBaseUrl()}${this.urls.getAuthRefreshUrl()}`,
        { refresh_token: this.refreshToken },
      )
      .pipe(
        tap((val) => this.saveTokens(val)),

        catchError((err) => {
          this.logout();
          return throwError(() => err);
        }),
      );
  }

  logout() {
    this.coockieService.delete('token');
    this.coockieService.delete('refreshToken');
    this.token = null;
    this.refreshToken = null;

    this.http.post(
      `${this.urls.getBaseUrl()}${this.urls.getAuthLogoutUrl()}`,
      {},
    );

    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    this.coockieService.set('token', res.access_token);
    this.coockieService.set('refreshToken', res.refresh_token);
  }
}
