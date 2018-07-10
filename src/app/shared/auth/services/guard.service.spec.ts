import { ReflectiveInjector } from '@angular/core';
import {
  BaseRequestOptions,
  ConnectionBackend,
  Http,
  RequestOptions,
  Response,
  ResponseOptions,
} from '@angular/http';
import { tick, fakeAsync } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ModuleConfig } from '../models/module-config';
import { JwtHelperService } from './jwt-helper.service';
import { JwtStorageService } from './jwt-storage.service';
import { GuardService } from './guard.service';


describe('GuardService', () => {
  let service: GuardService;
  let mockConnection: MockConnection;

  let jwtHelperServiceMock: jasmine.SpyObj<JwtHelperService>;
  let jwtStorageServiceMock: jasmine.SpyObj<JwtStorageService>;
  let authModuleConfigStub: ModuleConfig;

  beforeEach(() => {
    jwtHelperServiceMock = jasmine.createSpyObj<JwtHelperService>('JwtHelperService', [
      'isJwtDefined',
      'isTokenExpired'
    ]);

    jwtStorageServiceMock = jasmine.createSpyObj<JwtStorageService>('JwtStorageService', [
      'getJwt',
      'saveJwt'
    ]);

    authModuleConfigStub = <ModuleConfig>{
      tokenStorageKey: 'jwtStorageKey',
      authProxyUrl: 'http://test.local'
    };

    const injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ModuleConfig, useValue: authModuleConfigStub },
      { provide: JwtHelperService, useValue: jwtHelperServiceMock },
      { provide: JwtStorageService, useValue: jwtStorageServiceMock },
      Http,
      GuardService
    ]);

    service = injector.get(GuardService);
    const mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((connection: MockConnection) => mockConnection = connection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if the user is authenticated when the jwt is not defined.', () => {
    jwtHelperServiceMock.isJwtDefined.and.returnValue(false);
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeFalsy();
  });

  it('should check if the user is authenticated when the jwt is expired.', () => {
    jwtStorageServiceMock.getJwt.and.returnValue('jwt');
    jwtHelperServiceMock.isJwtDefined.and.returnValue(true);
    jwtHelperServiceMock.isTokenExpired.and.returnValue(true);
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeFalsy();
  });

  it('should check if the user is authenticated.', () => {
    jwtStorageServiceMock.getJwt.and.returnValue('jwt');
    jwtHelperServiceMock.isJwtDefined.and.returnValue(true);
    jwtHelperServiceMock.isTokenExpired.and.returnValue(false);
    const isAuthenticated = service.isAuthenticated();
    expect(isAuthenticated).toBeTruthy();
  });

  it('should use the endpoint configured in module options.', fakeAsync(() => {
    jwtHelperServiceMock.isJwtDefined.and.returnValue(true);
    jwtStorageServiceMock.saveJwt.and.callThrough();

    const refreshTokenEndpoint = `${authModuleConfigStub.authProxyUrl}/token/refresh`;

    service.refreshToken();

    tick();

    expect(mockConnection.request.url).toEqual(refreshTokenEndpoint);
  }));

  it('should contains the bearer authorization in the request to refresh the token.', fakeAsync(() => {
    const jwtStub = 'json.web.token';
    jwtHelperServiceMock.isJwtDefined.and.returnValue(true);
    jwtStorageServiceMock.getJwt.and.returnValue(jwtStub);

    service.refreshToken();

    tick();

    expect(mockConnection.request.headers.get('Authorization')).toEqual(`Bearer ${jwtStub}`);
  }));

  it('should retrieve and save the jwt after refresh token has been requested.', fakeAsync(() => {
    jwtHelperServiceMock.isJwtDefined.and.returnValue(true);
    jwtStorageServiceMock.saveJwt.and.callThrough();

    let anyResult: boolean;
    let anyError: boolean;

    service
      .refreshToken()
      .then(() => anyResult = true)
      .catch(() => anyError = true);

    mockConnection.mockRespond(new Response(new ResponseOptions({
      body: JSON.stringify({ token: 'jwt' })
    })));

    tick();

    expect(anyResult).toBeTruthy();
    expect(anyError).toBeUndefined();
    expect(jwtStorageServiceMock.saveJwt).toHaveBeenCalledWith('jwt');
  }));

  it('should reject the promise when an error occurs while attempting to retrieve a new token.', fakeAsync(() => {
    jwtHelperServiceMock.isJwtDefined.and.returnValue(true);
    jwtStorageServiceMock.saveJwt.and.callThrough();

    let anyResult: boolean;
    let anyError: boolean;

    service
      .refreshToken()
      .then(() => anyResult = true)
      .catch(() => anyError = true);

    mockConnection.mockRespond(new Response(new ResponseOptions({
      status: 404,
      statusText: 'URL not Found'
    })));

    tick();

    expect(anyResult).toBeUndefined();
    expect(anyError).toBeTruthy();
    expect(jwtStorageServiceMock.saveJwt).not.toHaveBeenCalled();
  }));

});
