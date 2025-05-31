import { Component, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-branch',
  templateUrl: './shop-branch.component.html',
  styleUrls: ['./shop-branch.component.css']
})
export class ShopBranchComponent implements OnInit {

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
