import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {UrlHelperService} from "../data/services/urlHelper.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  constructor(private http: HttpClient, private urls: UrlHelperService) { }
  
  login(payload: { username: string, password: string }) {
    const fordData = new FormData();

    fordData.append('username', payload.username);
    fordData.append('password', payload.password);

    let requestUrl = `${this.urls.getBaseUrl()}${this.urls.getAccountLoginUrl()}`;
    
    return this.http.post(
      requestUrl,
      fordData);
  }
}
