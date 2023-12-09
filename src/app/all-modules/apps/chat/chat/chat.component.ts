import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  urlComplete = {
    mainUrl : '',
    subUrl : '',
    childUrl : ''
  };

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if ( event instanceof NavigationEnd) {
        const url = event.url.split('/');
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
      }
    });
  }

  ngOnInit() {
  }

}
