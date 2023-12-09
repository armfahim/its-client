import { Component, OnInit,HostListener, NgZone } from '@angular/core';
@Component({
  selector: 'app-budgetrevenues',
  templateUrl: './budgetrevenues.component.html',
  styleUrls: ['./budgetrevenues.component.css']
})
@HostListener('window: resize', ['$event'])
export class BudgetrevenuesComponent implements OnInit {

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
