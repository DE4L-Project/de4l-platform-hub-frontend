import * as _ from "lodash";
import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {KeycloakTokenParsed} from "keycloak-js";
import {Clipboard} from "@angular/cdk/clipboard";

@Component({
  selector: 'de4l-token-dialog',
  templateUrl: './token-dialog.component.html',
  styleUrls: ['./token-dialog.component.css']
})
export class TokenDialogComponent implements OnInit {


  constructor(protected dialogRef: MatDialogRef<TokenDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { parsedAccessToken: KeycloakTokenParsed, accessToken: string },
              private clipboard: Clipboard) {
  }

  ngOnInit(): void {
  }

  onCopyAccessToken($event: MouseEvent) {
    this.clipboard.copy(this.data.accessToken);
  }
}
