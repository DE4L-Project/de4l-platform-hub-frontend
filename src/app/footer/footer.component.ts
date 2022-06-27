import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../config/config.service";

@Component({
  selector: 'de4l-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly date = new Date()

  gitCommitHash : string = "";

  constructor(protected configService: ConfigService) {
  }

  ngOnInit(): void {
    this.gitCommitHash = this.configService.appConfig.gitCommitHash
  }

}
