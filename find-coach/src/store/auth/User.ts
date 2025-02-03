export class User {

  private _userId: string
  private _token: string
  private _email: string
  private _expiration: number
  private _refreshToken: string


  constructor(userId: string, token: string, email: string, expiresIn: number, refreshToken: string) {
    this._userId = userId;
    this._token = token;
    this._email = email;
    this._expiration = expiresIn;
    this._refreshToken = refreshToken;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get expiration(): number {
    return this._expiration;
  }

  set expiration(value: number) {
    this._expiration = value;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }
}
