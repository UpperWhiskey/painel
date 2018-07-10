import { Injectable } from '@angular/core';

export class BaseModuleConfig {
  spaName: string;
  authProxyUrl: string;
  tokenParamName?: string;
  tokenStorageKey?: string;

  constructor() {
    this.tokenParamName = 'authToken';
    this.tokenStorageKey = 'auth-token';
  }
}

@Injectable()
export class ModuleConfig extends BaseModuleConfig { }
