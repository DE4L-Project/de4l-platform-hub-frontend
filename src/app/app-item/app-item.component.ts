import {Component, Input, OnInit} from '@angular/core';
import {AppItem} from "./shared/app-item";

@Component({
  selector: 'de4l-app-item',
  templateUrl: './app-item.component.html',
  styleUrls: ['./app-item.component.css']
})
export class AppItemComponent implements OnInit {

  @Input()
  app: AppItem = {
    name: "Simulator",
    subtitle: "Angular 8",
    linkUrl: "http://app.local:4200",
    description: "",
    imageUrl: "assets/400x320.png",
    iconUrl: "assets/angular.png"
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
