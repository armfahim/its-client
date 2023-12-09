import { Component, OnInit } from '@angular/core';
import { AllModulesService } from 'src/app/all-modules/all-modules.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.css']
})
export class ChatSidebarComponent implements OnInit {

  chatsList: any = [];

  constructor(private allModuleService: AllModulesService ) {
    // this.allModuleService.getChats().subscribe(data => {
    //   this.chatsList = data;
    // });
  }

  ngOnInit() {
  }

}
