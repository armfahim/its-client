import { Component, OnInit } from "@angular/core";
import { AppsServiceService } from "../../apps-service.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-email-pagecontent",
  templateUrl: "./email-pagecontent.component.html",
  styleUrls: ["./email-pagecontent.component.css"],
})
export class EmailPagecontentComponent implements OnInit {
  inboxMessage: any = [];
  status: boolean = false;
  constructor(private appsService: AppsServiceService, private routes: Router) {
    this.appsService.getInboxMessages().subscribe((data) => {
      this.inboxMessage = data;
    });
  }

  ngOnInit() {}
  clickMessage() {
    this.routes.navigate(["/apps/mailview"]);
  }
  clickEvent() {
    this.status = !this.status;
  }
}
