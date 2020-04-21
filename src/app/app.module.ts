import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {FlexModule} from "@angular/flex-layout";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {FooterComponent} from './footer/footer.component';
import {MatDividerModule} from "@angular/material/divider";
import {AppListComponent} from './app-list/app-list.component';
import {AppItemComponent} from './app-item/app-item.component';
import {MatCardModule} from "@angular/material/card";
import {KeycloakService} from "keycloak-angular";
import {TokenDialogComponent} from './auth/token/token-dialog/token-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTreeModule} from "@angular/material/tree";
import {AppBootstrap} from "./app.bootstrap";

const keycloakService = new KeycloakService();

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    AppListComponent,
    AppItemComponent,
    TokenDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    FlexModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatDialogModule,
    MatTreeModule
  ],
  providers: [
    {
      provide: KeycloakService,
      useValue: keycloakService
    }
  ],
  entryComponents: [
    TokenDialogComponent
  ]
})
export class AppModule implements DoBootstrap {

  ngDoBootstrap(appRef: ApplicationRef) {
    new AppBootstrap()
      .bootstrapKeycloak(keycloakService)
      .then(() => {
        appRef.bootstrap(AppComponent);
      })
      .catch(error => console.error('[BOOTSTRAP] init failed', error));
  }
}
