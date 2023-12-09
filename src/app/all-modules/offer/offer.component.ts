import { Component, OnInit,HostListener, NgZone } from '@angular/core';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
@HostListener('window: resize', ['$event'])
export class OfferComponent implements OnInit {

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
