import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {AppConfig} from "./app-config.interface";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private static readonly CONFIG_BASE_FILE = "assets/config.json";

  appConfig: AppConfig;

  constructor(protected http: HttpClient) {

  }

  loadConfig(): Observable<void> {
    return this.http.get(ConfigService.CONFIG_BASE_FILE)
      .pipe(
        mergeMap((localResponse: any) => {
          return this.http.get(localResponse.configUrl).pipe(
            map((configResponse: any) => {
              configResponse.configProperties.gitCommitHash = localResponse.gitCommitHash
              return configResponse
            })
          );
        }),
        map((response: any) => {
          this.appConfig = {
            baseUrl: response.configProperties.baseUrl,
            keycloakJsonUrl: response.configProperties.keycloakJsonUrl,
            gitCommitHash: response.configProperties.gitCommitHash
          }
          console.log(this.appConfig);
        })
      )
  }
}
