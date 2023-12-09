import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { HeaderService } from "./header.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  jsonData: any = {
    notification: [],
    message: [],
  };
  notifications: any;
  messagesData: any;

  constructor(private headerService: HeaderService, private router: Router) {}

  ngOnInit() {
    // this.getDatas("notification");
    // this.getDatas("message");

    this.notifications = [
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "4 mins ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "1 hour ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "4 mins ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "1 hour ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "4 mins ago",
      },
      {
        message: "Patient appointment booking",
        author: "John Doe",
        function: "added new task",
        time: "1 hour ago",
      },
    ];

    this.messagesData = [
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "4 mins ago",
      },
      {
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing",
        author: "Mike Litorus",
        time: "1 hour ago",
      },
    ];
  }

  getDatas(section) {
    this.headerService.getDataFromJson(section).subscribe((data) => {
      this.jsonData[section] = data;
    });
  }

  clearData(section) {
    this.jsonData[section] = [];
  }
  onSubmit() {
    this.router.navigate(["/pages/search"]);
  }
}
