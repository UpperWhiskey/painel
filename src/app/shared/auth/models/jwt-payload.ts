export class JwtPayload {

  [property: string]: any;

  public sub: string;
  public exp: number;
  public accessToken: string;
  public refreshToken: string;
  public scopes: string[] = [];

  public hasAnyScope(...scopes: string[]): boolean {
    return this.scopes.some(scope => scopes.includes(scope));
  }

}
