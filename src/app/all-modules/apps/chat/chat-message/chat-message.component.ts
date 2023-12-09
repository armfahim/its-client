import { Component, OnInit, ViewChild } from "@angular/core";
import { AllModulesService } from "src/app/all-modules/all-modules.service";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.css"],
})
export class ChatMessageComponent implements OnInit {
  chatsList: any = [];
  messageChat = "";
  members;
  @ViewChild("imagePond", { static: false }) imagePond: any;

  pondOptions = {
    class: "my-filepond",
    multiple: true,
    labelIdle: "Browse and Drop files here",
    acceptedFileTypes: "image/jpeg, image/png",
  };

  pondFiles = ["assets/img/logo2.png"];

  constructor(private allModuleService: AllModulesService) {
    // this.allModuleService.getChats().subscribe(data => {
    //   this.chatsList = data;
    // });

    this.members = this.allModuleService.members;
  }

  ngOnInit() {}

  sendMessage() {
    const obj = {
      message: this.messageChat,
      time: "Just Now",
      status: "sent",
    };
    this.chatsList.push(obj);
    this.messageChat = "";
  }
}
