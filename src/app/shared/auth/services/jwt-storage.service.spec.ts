import { TestBed, inject } from '@angular/core/testing';

import { ModuleConfig } from '../models/module-config';
import { JwtHelperService } from './jwt-helper.service';
import { JwtStorageService } from './jwt-storage.service';

describe('JwtStorageService', () => {

  let configStub: ModuleConfig;
  let service: JwtStorageService;

  beforeEach(() => {

    configStub = <ModuleConfig>{
      tokenStorageKey: 'jwtStorageKey'
    };

    TestBed
      .configureTestingModule({
        providers: [
          JwtStorageService,
          {
            provide: ModuleConfig,
            useValue: configStub
          }
        ]
      });

  });

  beforeEach(inject([JwtStorageService], (injectedService: JwtStorageService) => {
    service = injectedService;
  }));

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should save the JWT on storage', () => {
    spyOn(localStorage, 'setItem').and.callFake(() => { });

    const jwtStub = '1234567890';

    service.saveJwt(jwtStub);

    expect(localStorage.setItem).toHaveBeenCalledWith(configStub.tokenStorageKey, jwtStub);
  });

  it('should save a decode base64 JWT on storage', () => {
    spyOn(localStorage, 'setItem').and.callFake(() => { });

    const jwtStub = '1234567890';
    const jwtBase64Stub = btoa(jwtStub);

    service.saveJwtBase64(jwtBase64Stub);

    expect(localStorage.setItem).toHaveBeenCalledWith(configStub.tokenStorageKey, jwtStub);
  });

  it('should retrive the JWT from storage', () => {
    const jwtStub = '123456';

    spyOn(localStorage, 'getItem').and.returnValue(jwtStub);

    const jwt = service.getJwt();

    expect(jwt).toEqual(jwtStub);
  });

  it('should clear the JWT from storage', () => {
    const jwtStub = '123456';

    spyOn(localStorage, 'getItem').and.returnValue(jwtStub);
    spyOn(localStorage, 'removeItem').and.callFake(() => { });

    service.clearJwt();

    expect(localStorage.removeItem).toHaveBeenCalledWith(configStub.tokenStorageKey);
  });

});
