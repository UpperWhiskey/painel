import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ModuleConfig } from '../models/module-config';
import { JwtStorageService } from './jwt-storage.service';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private config: ModuleConfig,
    private storage: JwtStorageService) { }

  logout(): Observable<void> {
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${this.storage.getJwt()}`);

    const revokeTokenEndpoint = `${this.config.authProxyUrl}/token/revoke`;

    return this.http
      .post(revokeTokenEndpoint, null, { headers: headers })
      .map(() => this.storage.clearJwt());
  }

}
