import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'de4l-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly date = new Date()

  constructor() {
  }

  ngOnInit(): void {
  }

}
