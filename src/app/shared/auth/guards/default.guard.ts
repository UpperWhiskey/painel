import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { ModuleConfig } from '../models/module-config';
import { GuardService } from '../services/guard.service';
import { JwtStorageService } from '../services/jwt-storage.service';
import { BaseGuard } from './base-guard';

@Injectable()
export class DefaultGuard extends BaseGuard {

  private router: Router;
  private service: GuardService;

  constructor(
    router: Router,
    service: GuardService,
    options: ModuleConfig,
    storage: JwtStorageService) {

    super(options, storage);
    this.router = router;
    this.service = service;

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    return new Promise((resolve: Function) => {
      resolve(true);
      //this.router.navigateByUrl('/acessonegado');

    //  if (this.service.isAuthenticated()) {

    //    resolve(true);

    //  } else if (this.service.hasRefreshToken()) {

    //    this.service
    //      .refreshToken()
    //      .then(() => resolve(true))
    //      .catch((errorResponse: Response) => {

    //        resolve(false);

    //        if (errorResponse.status === 403) {

    //          this.service.redirectToAuthenticationPage();

    //        } else {

    //          this.router.navigateByUrl('/auth/error');

    //        }

    //      });

    //  } else {

    //    resolve(false);
    //    this.service.redirectToAuthenticationPage();

    //  }

    });

  }

}
