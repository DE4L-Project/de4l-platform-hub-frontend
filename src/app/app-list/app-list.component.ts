import {Component, OnInit} from '@angular/core';
import {AppItem} from "../app-item/shared/app-item";

@Component({
  selector: 'de4l-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent implements OnInit {

  apps: AppItem[] = [
    {
      name: "Simulator",
      subtitle: "Angular 8",
      linkUrl: "http://app.local:4200",
      description: "",
      imageUrl: "assets/400x320.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Sensor Data",
      subtitle: "Angular 8",
      linkUrl: "http://app.local:4200",
      description: "",
      imageUrl: "assets/400x320.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Shipment Track & Trace",
      subtitle: "Angular 8",
      linkUrl: "http://app.local:4200",
      description: "",
      imageUrl: "assets/400x320.png",
      iconUrl: "assets/angular.png"
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
