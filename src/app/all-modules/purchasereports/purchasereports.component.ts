import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchasereports',
  templateUrl: './purchasereports.component.html',
  styleUrls: ['./purchasereports.component.css']
})
export class PurchasereportsComponent implements OnInit {

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
