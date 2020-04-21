import * as moment from "moment";

export class TokenInformation {

  // Invalidate tokens before expiry time
  private readonly BUFFER_SECONDS = 10;

  constructor(
    public accessToken: string,
    public accessTokenExp: number,
    public refreshToken: string,
    public refreshTokenExp: number,
    public idToken: string,
    public idTokenExp: number) {
  }

  isAccessTokenExpired(): boolean {
    return this.isExpired(this.accessTokenExp);
  }

  isRefreshTokenExpired(): boolean {
    return this.isExpired(this.refreshTokenExp);
  }

  isIdTokenExpired(): boolean {
    return this.isExpired(this.idTokenExp);
  }

  private isExpired(expiresAt: number): boolean {
    return expiresAt == null ? true : moment.unix(expiresAt).isBefore(moment().subtract(this.BUFFER_SECONDS, "seconds"));
  }

  getDebugInfo(): any {
    return {
      accessTokenExp: moment.unix(this.accessTokenExp).toISOString(),
      refreshTokenExp: moment.unix(this.refreshTokenExp).toISOString(),
      idTokenExp: moment.unix(this.idTokenExp).toISOString(),
    }
  }
}
