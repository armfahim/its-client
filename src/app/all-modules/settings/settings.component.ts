import { Component, OnInit, HostListener, NgZone } from "@angular/core";
import { NavigationEnd, Event, Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
@HostListener("window: resize", ["$event"])
export class SettingsComponent implements OnInit {
  public innerHeight: any;
  public urlComplete = {
    mainUrl: "",
    subUrl: "",
    childUrl: "",
  };
  getScreenHeight() {
    this.innerHeight = window.innerHeight + "px";
  }

  constructor(private ngZone: NgZone, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url.split("/");
        this.urlComplete.mainUrl = url[1];
        this.urlComplete.subUrl = url[2];
        this.urlComplete.childUrl = url[3];
      }
    });
    window.onresize = (e) => {
      this.ngZone.run(() => {
        this.innerHeight = window.innerHeight + "px";
      });
    };
    this.getScreenHeight();
  }

  ngOnInit() {}

  onResize(event) {
    this.innerHeight = event.target.innerHeight + "px";
  }
}
