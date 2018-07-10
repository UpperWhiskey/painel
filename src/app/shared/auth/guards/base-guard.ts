import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';

import { JwtStorageService } from '../services/jwt-storage.service';
import { ModuleConfig } from '../models/module-config';

export abstract class BaseGuard implements CanActivate {

  private options: ModuleConfig;
  private storage: JwtStorageService;

  constructor(options: ModuleConfig, storage: JwtStorageService) {
    this.options = options;
    this.storage = storage;

    this.loadAndSaveAvailableToken();
  }

  public abstract canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean;

  private loadAndSaveAvailableToken(): void {
    const authToken = this.getTokenQueryParam();

    if (authToken !== undefined) {
      this.storage.saveJwtBase64(authToken);
      this.clearTokenParam();
    }
  }

  private getTokenQueryParam(): string {
    const authTokenParamMatch = window.location.href.match(this.getTokenParamRegex());
    if (authTokenParamMatch !== null) {
      return authTokenParamMatch[1];
    }
    return undefined;
  }

  private clearTokenParam(): void {
    const urlWithoutAccessToken = window.location.href.replace(this.getTokenParamRegex(), '');
    setTimeout(() => window.location.replace(urlWithoutAccessToken), 1);
  }

  private getTokenParamRegex(): RegExp {
    return new RegExp(`[&]?${this.options.tokenParamName}=([^&#]*)`);
  }

}
