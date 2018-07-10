import { Injectable } from '@angular/core';

import { ModuleConfig } from '../models/module-config';

@Injectable()
export class JwtStorageService {

  constructor(private config: ModuleConfig) { }

  saveJwt(jwt: string): void {
    localStorage.setItem(this.config.tokenStorageKey, jwt);
  }

  saveJwtBase64(token: string): void {
    const jwt = atob(token);
    this.saveJwt(jwt);
  }

  getJwt(): string {
    return localStorage.getItem(this.config.tokenStorageKey) || undefined;
  }

  clearJwt(): void {
    localStorage.removeItem(this.config.tokenStorageKey);
  }

}
