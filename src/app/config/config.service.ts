import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Config} from "./config";
import {map, mergeMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config: Config;

  constructor(protected http: HttpClient) {

  }

  loadConfig(): Observable<void> {
    return this.http.get("config.dev.json")
      .pipe(
        mergeMap((response: any) => {
          return this.http.get(response.configUrl);
        }),
        map((response: any) => {
          this.config = {
            baseUrl: response.baseUrl,
            keycloakJsonUrl: response.keycloakJsonUrl
          }
          console.log(this.config);
        })
      )
  }
}
