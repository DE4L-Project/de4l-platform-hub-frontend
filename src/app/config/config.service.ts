import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, mergeMap} from "rxjs/operators";
import {AppConfig} from "./app-config.interface";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private static readonly CONFIG_BASE_FILE = "config.json";

  appConfig: AppConfig;

  constructor(protected http: HttpClient) {

  }

  loadConfig(): Observable<void> {
    return this.http.get(ConfigService.CONFIG_BASE_FILE)
      .pipe(
        mergeMap((response: any) => {
          return this.http.get(response.configUrl);
        }),
        map((response: any) => {
          this.appConfig = {
            baseUrl: response.configProperties.baseUrl,
            keycloakJsonUrl: response.configProperties.keycloakJsonUrl
          }
          console.log(this.appConfig);
        })
      )
  }
}
