import {KeycloakService} from "keycloak-angular";
import {TokenInformation} from "./auth/shared/token.model";
import {KeycloakInitOptions} from "keycloak-angular/public_api";
import {AuthService} from "./auth/auth.service";
import {ConfigService} from "./config/config.service";
import {Observable} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {catchError, tap} from "rxjs/operators";

export class AppBootstrap {

  bootstrapKeycloak(keycloakService: KeycloakService, configService: ConfigService): Observable<boolean> {

    let initOptions: KeycloakInitOptions = {};

    const token = this.getTokenFromLocalStorage();
    if (token !== null && !token.isRefreshTokenExpired()) {
      console.log("[AUTH] Using local storage token for initialization.");
      initOptions = {
        token: token.accessToken,
        idToken: token.idToken,
        refreshToken: token.refreshToken,
      }
    }

    return fromPromise(keycloakService
      .init(
        {
          config: configService.config.keycloakJsonUrl,
          initOptions: initOptions,
          loadUserProfileAtStartUp: false
        }
      ))
      .pipe(
        tap(() => {
          console.log("[AUTH] Initialization finished.");
        })
      )
  }

  getTokenFromLocalStorage(): TokenInformation {
    const tokenJson = localStorage.getItem(AuthService.KEYCLOAK_TOKEN_LS_KEY);
    if (!tokenJson) {
      return null;
    }

    const tokenObj = JSON.parse(tokenJson);
    console.log("[AUTH] Loaded token from cache.");

    return new TokenInformation(
      tokenObj.accessToken,
      tokenObj.accessTokenExp,
      tokenObj.refreshToken,
      tokenObj.refreshTokenExp,
      tokenObj.idToken,
      tokenObj.idTokenExp
    );
  }
}
