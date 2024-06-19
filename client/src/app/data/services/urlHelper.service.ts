import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlHelperService {
  private baseApiUrl = 'https://icherniakov.ru/yt-course/';
  private account_testAccount_Url = 'account/test_accounts';
  private account_login_Url = 'auth/token';

  getBaseUrl() {
    return this.baseApiUrl;
  }

  getAccountTestAccountsUrl(){
    return this.account_testAccount_Url;
  }

  getAccountLoginUrl(){
    return this.account_login_Url;
  }
}
