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
      linkUrl: "https://dev-de4l.iml.fraunhofer.de/lzm/",
      description: "",
      imageUrl: "assets/400x320-lieferzonen.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Sensor Analytics",
      subtitle: "Environmental Sensor Data Map Application",
      linkUrl: "https://sensor.de4l.io/",
      description: "",
      imageUrl: "assets/de4l-sensor-analytics.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Sensor Monitoring (internal only)",
      subtitle: "Application for Sensor Things API",
      linkUrl: "http://de4l-sensor-things-de4l-sta-frontend-1.rancher.internal/",
      description: "",
      imageUrl: "assets/de4l-sensor-monitoring_400x320.png",
      iconUrl: "assets/angular.png"
    },
    {
      name: "Routing (WIP)",
      subtitle: "Prototype for healthy routing",
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
