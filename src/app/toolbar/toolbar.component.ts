import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {TokenDialogComponent} from "../auth/token/token-dialog/token-dialog.component";
import {KeycloakTokenParsed} from "keycloak-js";
import {User} from "../auth/shared/user";
import {BehaviorSubject, Subject} from "rxjs";
import {filter, mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'de4l-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: User;

  constructor(protected authService: AuthService, protected dialog: MatDialog) {

  }

  ngOnInit() {
    this.isLoggedIn$
      .pipe(
        filter((isLoggedIn) => isLoggedIn),
        mergeMap(() => this.authService.getUser())
      )
      .subscribe((user: User) => this.user = user);

    this.authService.isLoggedIn()
      .subscribe((isLoggedIn) => this.isLoggedIn$.next(isLoggedIn), error => console.log(error));

  }

  onLoginClick($event: MouseEvent) {
    this.authService.login();
  }

  onJWTTokenInfoClicked($event: MouseEvent) {
    this.openTokenDialog(this.authService.getKcToken(), this.authService.getKcAccessTokenString());
  }

  protected openTokenDialog(token: KeycloakTokenParsed, tokenString: string) {
    const dialogRef = this.dialog.open(TokenDialogComponent, {
      width: '600px',
      maxHeight: '80%',
      data: {parsedAccessToken: token, accessToken: tokenString}
    });
  }

  onLogoutClicked($event: MouseEvent) {
    this.authService.logout();
  }

  getKcAccountUrl(): string {
    return this.authService.getKcAccountUrl();
  }
}
