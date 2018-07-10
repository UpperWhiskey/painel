import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from 'app/shared/auth/services/jwt-helper.service';

import { JwtPayload } from '../models/jwt-payload';
import { ModuleConfig } from '../models/module-config';
import { GuardService } from '../services/guard.service';
import { JwtStorageService } from '../services/jwt-storage.service';
import { BaseGuard } from './base-guard';

@Injectable()
export class ScopeGuard extends BaseGuard {

  private router: Router;
  private service: GuardService;
  private jwtHelper: JwtHelperService;

  constructor(
    router: Router,
    service: GuardService,
    options: ModuleConfig,
    storage: JwtStorageService,
    jwtHelper: JwtHelperService) {

    super(options, storage);

    this.router = router;
    this.service = service;
    this.jwtHelper = jwtHelper;

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve: Function) => {

      if (this.service.isAuthenticated()) {

        this.checkAuthorization(route, resolve);

      } else if (this.service.hasRefreshToken()) {

        this.refreshToken(resolve);

      } else {

        resolve(false);

        this.service.redirectToAuthenticationPage();

      }

    });

  }

  private checkAuthorization(route: ActivatedRouteSnapshot, resolve: Function): void {

    const scopes: string[] = route.data.scopes;
    const payload: JwtPayload = this.jwtHelper.getPayload();

    const hasAnyScope = payload.hasAnyScope.apply(payload, scopes);

    if (hasAnyScope) {

      resolve(true);

    } else {

      resolve(false);

      this.router.navigateByUrl('/auth/forbidden');

    }

  }

  private refreshToken(resolve: Function): void {

    this.service
      .refreshToken()
      .then(() => resolve(true))
      .catch((errorResponse: Response) => {

        if (errorResponse.status === 403) {

          resolve(false);

          this.service.redirectToAuthenticationPage();

        } else {

          this.router.navigateByUrl('/auth/error');

        }

      });

  }

}
