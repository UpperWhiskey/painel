import { JwtPayload } from './jwt-payload';

describe('JwtPayload', () => {

  it('should check if payload contains any scope', () => {

    const payloadStub: JwtPayload = new JwtPayload();
    payloadStub.scopes = ['read', 'write', 'admin'];

    let hasAnyScope: boolean = payloadStub.hasAnyScope('read', 'admin');

    expect(hasAnyScope).toBeTruthy();

    const scopesArray: string[] = ['write'];

    hasAnyScope = payloadStub.hasAnyScope.apply(payloadStub, scopesArray);

    expect(hasAnyScope).toBeTruthy();

  });

  it('should check if payload not contains any scope', () => {

    const payloadStub: JwtPayload = new JwtPayload();
    payloadStub.scopes = ['read', 'write', 'admin'];

    const hasAnyScope: boolean = payloadStub.hasAnyScope('other', 'scope');

    expect(hasAnyScope).toBeFalsy();

  });

});
