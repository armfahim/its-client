import { Component, OnInit,HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-studentcandidate',
  templateUrl: './studentcandidate.component.html',
  styleUrls: ['./studentcandidate.component.css']
})
@HostListener('window: resize', ['$event'])
export class StudentcandidateComponent implements OnInit {

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
