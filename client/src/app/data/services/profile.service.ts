import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../interfaces/profile.interface';
import {UrlHelperService} from "../services/urlHelper.service";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http: HttpClient;
  private urls: UrlHelperService

  constructor(@Inject(HttpClient) http: HttpClient, @Inject(UrlHelperService) urls: UrlHelperService) { 
    this.http = http;
    this.urls = urls;
  }

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.urls.getBaseUrl()}${this.urls.getAccountTestAccountsUrl()}`);
  }
}
