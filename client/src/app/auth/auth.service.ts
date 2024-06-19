import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {UrlHelperService} from "../data/services/urlHelper.service";
import { tap } from 'rxjs';
import {TokenResponse} from "./auth.interface";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  refreshToken: string | null = null;
  coockieService: CookieService

  constructor(private http: HttpClient,
    private urls: UrlHelperService,
    @Inject(CookieService) coockieService: CookieService) {
    this.http = http;
    this.urls = urls;
    this.coockieService = coockieService;
  }

  login(payload: { username: string, password: string }) {
    const fordData = new FormData();

    fordData.append('username', payload.username);
    fordData.append('password', payload.password);
    
    return this.http.post<TokenResponse>(
      `${this.urls.getBaseUrl()}${this.urls.getAccountLoginUrl()}`,
      fordData).pipe(
        tap(val => {
          this.token = val.access_token;
          this.refreshToken = val.refresh_token;

          this.coockieService.set('token', val.access_token);
          this.coockieService.set('refreshToken', val.refresh_token);
        })
      );
  }

  get isAuth(){
    if(!this.token){
      this.token = this.coockieService.get('token');
    }
    return !!this.token;
  }
}
