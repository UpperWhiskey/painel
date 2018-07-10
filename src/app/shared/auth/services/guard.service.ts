import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ModuleConfig } from '../models/module-config';
import { JwtHelperService } from './jwt-helper.service';
import { JwtStorageService } from './jwt-storage.service';

@Injectable()
export class GuardService {

  constructor(
    private options: ModuleConfig,
    private http: Http,
    private storage: JwtStorageService,
    private helper: JwtHelperService) { }

  isAuthenticated(): boolean {
    if (!this.helper.isJwtDefined()) {
      return false;
    }

    const jwt = this.storage.getJwt();
    const isTokenExpired = this.helper.isTokenExpired(jwt);

    return !isTokenExpired;
  }

  redirectToAuthenticationPage(): void {
    window.location.href = `${this.options.authProxyUrl}/?spaName=${this.options.spaName}`;
  }

  hasRefreshToken(): boolean {
    return this.helper.hasRefreshToken();
  }

  refreshToken(): Promise<void> {
    if (!this.helper.isJwtDefined()) {
      return Promise.reject('JWT is not defined.');
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.storage.getJwt()}`);

    const refreshTokenEndpoint = `${this.options.authProxyUrl}/token/refresh`;

    return this.http
      .get(refreshTokenEndpoint, { headers: headers })
      .toPromise()
      .then(response => {
        const json = response.json();
        this.storage.saveJwt(json.token);
      })
      .catch(error => Promise.reject(error.message || error));
  }

}
