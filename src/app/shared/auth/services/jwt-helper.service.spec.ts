import { TestBed, inject } from '@angular/core/testing';

import { ModuleConfig } from '../models/module-config';
import { JwtPayload } from '../models/jwt-payload';
import { JwtHelperService } from './jwt-helper.service';
import { JwtStorageService } from './jwt-storage.service';

describe('JwtHelperService', () => {

  let service: JwtHelperService;

  let jwtStub: string;
  let payloadStub: any;
  let authModuleConfigStub: ModuleConfig;

  let jwtStorageServiceMock: jasmine.SpyObj<JwtStorageService>;

  beforeEach(() => {

    jwtStorageServiceMock = jasmine.createSpyObj<JwtStorageService>('JwtStorageService', ['getJwt']);

    authModuleConfigStub = <ModuleConfig>{
      tokenStorageKey: 'jwtStorageKey'
    };

    TestBed
      .configureTestingModule({
        providers: [
          {
            provide: ModuleConfig,
            useValue: authModuleConfigStub
          },
          {
            provide: JwtStorageService,
            useValue: jwtStorageServiceMock
          },
          JwtHelperService
        ]
      });

  });

  beforeEach(inject([JwtHelperService], (injectedService: JwtHelperService) => {

    jwtStub = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4Yjk5OTk5OTkiLCJleHAiOjEyMzQ1Njc4OTAsImFjY2Vzc1Rva2VuIjoiYWNjZXNzVG9rZW4xMjMiLCJyZWZyZXNoVG9rZW4iOiJyZWZyZXNoVG9rZW4xMjMifQ.xiw6iTyuIvuTRo7McKQLepoPmo0eSJfXFMGvR0itGdA';
    payloadStub = <JwtPayload>{
      'sub': 'xb9999999',
      'exp': 1234567890,
      'accessToken': 'accessToken123',
      'refreshToken': 'refreshToken123'
    };

    service = injectedService;

  }));

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should retrive and decode the JWT payload.', () => {
    jwtStorageServiceMock.getJwt.and.returnValue(jwtStub);

    const payload = service.getPayload();

    expect(jwtStorageServiceMock.getJwt).toHaveBeenCalled();

    expect(payload).toEqual(payloadStub);
  });

  it('should check if JWT is defined.', () => {
    jwtStorageServiceMock.getJwt.and.returnValue(jwtStub);

    const isJwtDefined = service.isJwtDefined();

    expect(isJwtDefined).toBeTruthy();
  });

  it('should check if JWT is undefined.', () => {
    const isJwtDefined = service.isJwtDefined();

    expect(isJwtDefined).toBeFalsy();
  });

  it('should check if not has access token.', () => {
    const hasAccessToken = service.hasAccessToken();

    expect(hasAccessToken).toBeFalsy();
  });

  it('should check if has access token.', () => {
    jwtStorageServiceMock.getJwt.and.returnValue(jwtStub);

    const hasAccessToken = service.hasAccessToken();

    expect(hasAccessToken).toBeTruthy();
  });

  it('should check if not has refresh token.', () => {
    const hasRefreshToken = service.hasRefreshToken();

    expect(hasRefreshToken).toBeFalsy();
  });

  it('should check if has refresh token.', () => {
    jwtStorageServiceMock.getJwt.and.returnValue(jwtStub);

    const hasRefreshToken = service.hasRefreshToken();

    expect(hasRefreshToken).toBeTruthy();
  });

});
