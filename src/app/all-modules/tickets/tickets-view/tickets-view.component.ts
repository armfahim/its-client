import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tickets-view',
  templateUrl: './tickets-view.component.html',
  styleUrls: ['./tickets-view.component.css']
})
export class TicketsViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  console.log("tickets");
  }

}
