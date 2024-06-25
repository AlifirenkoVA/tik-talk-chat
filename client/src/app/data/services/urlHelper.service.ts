import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlHelperService {
  private baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private account_testAccount_Url = 'account/test_accounts';
  private auth_login_Url = 'auth/token';
  private auth_refresh_Url = 'auth/refresh';
  private auth_logout_Url = 'auth/logout';
  private me_Url = 'account/me';

  getBaseUrl() {
    return this.baseApiUrl;
  }

  getAccountTestAccountsUrl() {
    return this.account_testAccount_Url;
  }

  getAuthLoginUrl() {
    return this.auth_login_Url;
  }

  getMeUrl() {
    return this.me_Url;
  }

  getAuthRefreshUrl() {
    return this.auth_refresh_Url;
  }

  getAuthLogoutUrl() {
    return this.auth_logout_Url;
  }
}
