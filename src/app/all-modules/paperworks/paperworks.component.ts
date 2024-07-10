import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-paperworks',
  templateUrl: './paperworks.component.html',
  styleUrls: ['./paperworks.component.css']
})
export class PaperworksComponent implements OnInit {

  public innerHeight: any;

  getScreenHeight() {
    this.innerHeight = window.innerHeight + 'px';
  }

  constructor(private ngZone: NgZone) {
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + 'px';
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
  }

}
