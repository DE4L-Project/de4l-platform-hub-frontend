import {Injectable} from '@angular/core';
import {KeycloakEventType, KeycloakService} from "keycloak-angular";
import {KeycloakProfile, KeycloakTokenParsed} from "keycloak-js";
import {User} from "./shared/user";
import {Observable, of, timer} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {filter, map} from "rxjs/operators";
import * as moment from "moment";
import {TokenInformation} from "./shared/token.model";
import {ConfigService} from "../config/config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Local storage key
  public static readonly KEYCLOAK_TOKEN_LS_KEY: string = "de4l.start.token";

  // Refresh time before access token is expired.
  public static readonly REFRESH_BUFFER_SECONDS: number = 20;

  constructor(protected keycloakService: KeycloakService, protected configService: ConfigService) {
    this.registerKeycloakEvents();
  }

  isLoggedIn(): Observable<boolean> {
    let isLoggedIn: boolean = false

    return fromPromise(this.keycloakService.isLoggedIn())
      .pipe(
        map((isLoggedInResponse) => {
          isLoggedIn = isLoggedInResponse;
          return isLoggedInResponse;
        }),
        filter(isLoggedInResponse => isLoggedInResponse),
        map(() => this.updateToken()),
        map(() => isLoggedIn)
      )
  }

  login(): void {
    this.deleteTokenInLocalStorage();
    this.keycloakService.login({
      redirectUri: this.configService.appConfig.baseUrl
    });
  }

  logout(): void {
    this.deleteTokenInLocalStorage();
    this.keycloakService.logout(this.configService.appConfig.baseUrl);
  }

  getUser(): Observable<User> {
    return fromPromise(this.keycloakService.loadUserProfile())
      .pipe(
        map((kcUserProfile: KeycloakProfile) => {
          return {
            name: kcUserProfile.firstName + " " + kcUserProfile.lastName,
            username: kcUserProfile.username
          }
        })
      )
  }

  getKcAccessTokenString(): string {
    return this.keycloakService.getKeycloakInstance().token;
  }

  getKcToken(): KeycloakTokenParsed {
    return this.keycloakService.getKeycloakInstance().tokenParsed;
  }

  getKcAccountUrl(): string {
    const kcInstance = this.keycloakService.getKeycloakInstance();
    return `${kcInstance.authServerUrl}realms/${kcInstance.realm}/account`;
  }

  private registerKeycloakEvents() {
    this.keycloakService.keycloakEvents$.subscribe((event) => {
      console.log(`[AUTH] Keycloak event received: ${event.type}`);
      switch (event.type) {
        case KeycloakEventType.OnAuthError:
          break;
        case KeycloakEventType.OnAuthLogout:
          break;
        case KeycloakEventType.OnAuthRefreshError:
          break;
        case KeycloakEventType.OnAuthRefreshSuccess:
          console.log("[AUTH] Authentication refreshed.");
          this.updateToken();
          break;
        case KeycloakEventType.OnAuthSuccess:
          break;
        case KeycloakEventType.OnReady:
          break;
        case KeycloakEventType.OnTokenExpired:
          console.log("[AUTH] Access token expired.");
          break;
      }
    });
  }

  private registerRefreshTimer(token: TokenInformation) {
    const refreshTime = (token.accessTokenExp - AuthService.REFRESH_BUFFER_SECONDS) - moment().unix();
    console.log(`[AUTH] Refreshing token at ${moment().add(refreshTime, "s").toISOString()}`);
    const refreshSubscription = timer(refreshTime * 1000)
      .subscribe(() => {
        this.keycloakService.updateToken(AuthService.REFRESH_BUFFER_SECONDS + 10)
          .then(() => {
            refreshSubscription.unsubscribe();
          })
          .catch((error) => {
            console.log("[AUTH] Error in refresh.");
            console.error(error);
            this.logout();
          });
      });
  }

  private saveTokenInLocalStorage(token: TokenInformation) {
    localStorage.setItem(AuthService.KEYCLOAK_TOKEN_LS_KEY, JSON.stringify(token));
    console.log("[AUTH] Saved token in local storage.");
  }

  private deleteTokenInLocalStorage() {
    localStorage.removeItem(AuthService.KEYCLOAK_TOKEN_LS_KEY);
    console.log("[AUTH] Deleted token from local storage.");
  }

  private updateToken(): void {
    this.getTokenInformation().subscribe((token) => {
      this.saveTokenInLocalStorage(token);
      this.registerRefreshTimer(token);
    });
  }

  private getTokenInformation(): Observable<TokenInformation> {
    return of(new TokenInformation(
      this.keycloakService.getKeycloakInstance().token,
      this.keycloakService.getKeycloakInstance().tokenParsed.exp,
      this.keycloakService.getKeycloakInstance().refreshToken,
      this.keycloakService.getKeycloakInstance().refreshTokenParsed.exp,
      this.keycloakService.getKeycloakInstance().idToken,
      this.keycloakService.getKeycloakInstance().idTokenParsed.exp
    ));
  }
}
