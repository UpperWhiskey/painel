import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

import { JwtPayload } from '../models/jwt-payload';
import { JwtStorageService } from './jwt-storage.service';

@Injectable()
export class JwtHelperService extends JwtHelper {

  constructor(private storage: JwtStorageService) {
    super();
  }

  isJwtDefined(): boolean {
    return this.storage.getJwt() !== undefined;
  }

  getPayload(): JwtPayload {
    const jwt = this.storage.getJwt();
    if (jwt) {
      return this.generatePayload(jwt);
    }
    return undefined;
  }

  hasAccessToken(): boolean {
    return this.isJwtDefined() && this.getPayload().accessToken !== undefined;
  }

  hasRefreshToken(): boolean {
    return this.isJwtDefined() && this.getPayload().refreshToken !== undefined;
  }

  private generatePayload(jwt: string): JwtPayload {
    const decodedJwt: any = this.decodeToken(jwt);
    const jwtPayload: JwtPayload = Object.assign(new JwtPayload(), decodedJwt);
    return jwtPayload;
  }

}
