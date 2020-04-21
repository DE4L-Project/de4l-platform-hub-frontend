import {KeycloakService} from "keycloak-angular";
import {TokenInformation} from "./auth/shared/token.model";
import {KeycloakInitOptions} from "keycloak-angular/public_api";
import {AuthService} from "./auth/auth.service";

export class AppBootstrap {

  bootstrapKeycloak(keycloakService: KeycloakService): Promise<any> {
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

    return keycloakService
      .init(
        {
          config: "assets/keycloak.json",
          initOptions: initOptions,
          loadUserProfileAtStartUp: false
        }
      )
      .then(() => {
        console.log("[AUTH] Initialization finished.");
      })
      .catch((error) => {
        console.error(error);
      })
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
