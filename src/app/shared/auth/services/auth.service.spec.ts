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
import { JwtStorageService } from './jwt-storage.service';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let mockConnection: MockConnection;

  let storageMock: jasmine.SpyObj<JwtStorageService>;
  let configStub: ModuleConfig;

  beforeEach(() => {
    storageMock = jasmine.createSpyObj<JwtStorageService>('JwtStorageService', [
      'getJwt',
      'clearJwt'
    ]);

    configStub = <ModuleConfig>{
      tokenStorageKey: 'jwtStorageKey',
      authProxyUrl: 'http://test.local'
    };

    const injector: ReflectiveInjector = ReflectiveInjector.resolveAndCreate([
      { provide: ConnectionBackend, useClass: MockBackend },
      { provide: RequestOptions, useClass: BaseRequestOptions },
      { provide: ModuleConfig, useValue: configStub },
      { provide: JwtStorageService, useValue: storageMock },
      Http,
      AuthService
    ]);

    service = injector.get(AuthService);
    const mockBackend = injector.get(ConnectionBackend) as MockBackend;
    mockBackend.connections.subscribe((connection: MockConnection) => mockConnection = connection);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request the correct endpoint to revoke the token.', fakeAsync(() => {
    storageMock.getJwt.and.returnValue('json.web.token');
    storageMock.clearJwt.and.callThrough();

    const revokeTokenEndpoint = `${configStub.authProxyUrl}/token/revoke`;

    service.logout().subscribe();

    tick();

    expect(mockConnection.request.url).toEqual(revokeTokenEndpoint);
  }));

  it('should contains the bearer authorization in the request to revoke the token.', fakeAsync(() => {
    const jwtStub = 'json.web.token';
    storageMock.getJwt.and.returnValue(jwtStub);
    storageMock.clearJwt.and.callThrough();

    service.logout().subscribe();

    tick();

    expect(mockConnection.request.headers.get('Authorization')).toEqual(`Bearer ${jwtStub}`);
  }));

  it('should clear the jwt from storage after the token revocation.', fakeAsync(() => {
    storageMock.clearJwt.and.callFake(() => { });

    service.logout().subscribe();

    mockConnection.mockRespond(new Response(new ResponseOptions({
      status: 200
    })));

    tick();

    expect(storageMock.clearJwt).toHaveBeenCalledTimes(1);
  }));

  it('should clear the jwt from storage even the token revocation is failed.', fakeAsync(() => {
    storageMock.clearJwt.and.callFake(() => { });

    service.logout().subscribe();

    mockConnection.mockRespond(new Response(new ResponseOptions({
      status: 500,
      statusText: 'Internal server error da depressão'
    })));

    tick();

    expect(storageMock.clearJwt).toHaveBeenCalledTimes(1);
  }));

});
