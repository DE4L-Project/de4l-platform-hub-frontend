import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {TokenDialogComponent} from "../auth/token/token-dialog/token-dialog.component";
import {KeycloakTokenParsed} from "keycloak-js";
import {User} from "../auth/shared/user";
import {BehaviorSubject, Subject} from "rxjs";
import {fromPromise} from "rxjs/internal-compatibility";
import {filter, mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'de4l-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
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
    this.openTokenDialog(this.authService.getKcToken());
  }

  protected openTokenDialog(token: KeycloakTokenParsed) {
    const dialogRef = this.dialog.open(TokenDialogComponent, {
      width: '600px',
      data: token
    });
  }

  onLogoutClicked($event: MouseEvent) {
    this.authService.logout("http://localhost:4200");
  }
}
