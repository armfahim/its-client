import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-component-main",
  templateUrl: "./component-main.component.html",
  styleUrls: ["./component-main.component.css"],
})
export class ComponentMainComponent implements OnInit, AfterViewInit {
  constructor(private myElement: ElementRef) {}
  @ViewChild("comp_alerts") alertsElement: ElementRef;
  @ViewChild("comp_breadcrumbs") breadElement: ElementRef;
  @ViewChild("comp_buttons") buttonElement: ElementRef;
  @ViewChild("comp_cards") cardElement: ElementRef;

  public currentActive = 0;
  public alertOffset: Number = null;
  public breadOffset: Number = null;
  public buttonOffset: Number = null;
  public cardsOffset: Number = null;
  ngOnInit() {}
  ngAfterViewInit() {}

  @HostListener("window:scroll", ["$event"])
  checkOffsetTop() {
    if (window.pageYOffset >= 10 && window.pageYOffset <= 600) {
      this.currentActive = 1;
    } else if (window.pageYOffset >= 650 && window.pageYOffset <= 1000) {
      this.currentActive = 2;
    } else if (window.pageYOffset >= 1100 && window.pageYOffset <= 1700) {
      this.currentActive = 3;
    } else if (window.pageYOffset >= 1800 && window.pageYOffset <= 2800) {
      this.currentActive = 4;
    } else if (window.pageYOffset >= 2987 && window.pageYOffset <= 3100) {
      this.currentActive = 5;
    } else if (window.pageYOffset >= 3327 && window.pageYOffset <= 3600) {
      this.currentActive = 6;
    } else if (window.pageYOffset >= 3793 && window.pageYOffset <= 4700) {
      this.currentActive = 7;
    } else if (window.pageYOffset >= 4856 && window.pageYOffset <= 5600) {
      this.currentActive = 8;
    } else if (window.pageYOffset >= 6000) {
      this.currentActive = 9;
    } else {
      this.currentActive = 0;
    }
  }
  breadScroll() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_breadcrumbs")
      .scrollIntoView({ behavior: "smooth" });
  }
  alertScroll() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_alerts")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonScroll() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_buttons")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonCards() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_cards")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonDropdown() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_dropdowns")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonPagination() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_pagination")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonProgress() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_progress")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonTabs() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_tabs")
      .scrollIntoView({ behavior: "smooth" });
  }
  buttonTypography() {
    this.myElement.nativeElement.ownerDocument
      .getElementById("comp_typography")
      .scrollIntoView({ behavior: "smooth" });
  }
}
