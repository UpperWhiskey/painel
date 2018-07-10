import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AuthConfig, AuthHttp } from 'angular2-jwt';
import { ScopeGuard } from 'app/shared/auth/guards/scope.guard';

import { authRouting } from './auth.routing';
import { ForbiddenComponent } from './components/forbidden.component';
import { RefreshErrorComponent } from './components/refresh-error.component';
import { DefaultGuard } from './guards/default.guard';
import { BaseModuleConfig, ModuleConfig } from './models/module-config';
import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';
import { JwtHelperService } from './services/jwt-helper.service';
import { JwtStorageService } from './services/jwt-storage.service';

export function authHttpServiceFactory(
  http: Http,
  requestOptions: RequestOptions,
  moduleOptions: ModuleConfig,
  helper: JwtHelperService): AuthHttp {

  return new AuthHttp(new AuthConfig({
    tokenName: moduleOptions.tokenStorageKey,
    noClientCheck: true, // por padrao, ele verifica se o jwt está expirado e isso impossibilita o uso do refresh token.
    tokenGetter: (() => helper.getPayload().accessToken),
    globalHeaders: [{ 'Content-Type': 'application/json' }]
  }), http, requestOptions);
}

// Factory necessaria para contornar o problema de declaracao estatica
// do angular compiler: "Error: Error encountered resolving symbol
// values statically. Function calls are not supported. Consider
// replacing the function or lambda with a reference to an exported
// function, resolving symbol"
export function AuthModuleConfigFactory(options: BaseModuleConfig): ModuleConfig {
  return Object.assign(new ModuleConfig(), options);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule.forChild(authRouting)
  ],
  declarations: [
    RefreshErrorComponent,
    ForbiddenComponent
  ]
})
export class AuthModule {
  static forRoot(options?: ModuleConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {
          provide: AuthHttp,
          useFactory: authHttpServiceFactory,
          deps: [Http, RequestOptions, ModuleConfig, JwtHelperService]
        },
        {
          provide: BaseModuleConfig,
          useValue: options
        },
        {
          provide: ModuleConfig,
          useFactory: AuthModuleConfigFactory,
          deps: [BaseModuleConfig]
        },
        DefaultGuard,
        ScopeGuard,
        AuthService,
        GuardService,
        JwtHelperService,
        JwtStorageService
      ]
    };
  }
}
