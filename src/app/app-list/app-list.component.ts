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
      name: "Delivery Zone Data Management",
      subtitle: "Application for managing address data and enhancing delivery process",
      linkUrl: "https://de4l.iml.fraunhofer.de/",
      description: "",
      imageUrl: "assets/400x320-lieferzonen.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Sensor Analytics",
      subtitle: "Environmental Sensor Data Map Application",
      linkUrl: "https://sensor.de4l.io/",
      description: "",
      imageUrl: "assets/400x320-sensor-map.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Sensor Monitoring",
      subtitle: "Angular 8",
      linkUrl: "http://app.local:4200",
      description: "",
      imageUrl: "assets/400x320.png",
      iconUrl: "assets/angular.png"
    },

  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
