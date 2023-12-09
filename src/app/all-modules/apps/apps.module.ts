import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppsRoutingModule } from './apps-routing.module';
import { ChatComponent } from './chat/chat/chat.component';
import { AppsComponent } from './apps.component';

// import filepond module
import { FilePondModule } from 'ngx-filepond';

// Tooltip module
import { TooltipModule } from 'ngx-bootstrap';

// Calendar Module
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

// Date picker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// Search Filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';


import { ChatProfileComponent } from './chat/chat-profile/chat-profile.component';
import { CallsSidebarComponent } from './chat/calls-sidebar/calls-sidebar.component';
import { CallsVoiceComponent } from './chat/calls-voice/calls-voice.component';
import { CallsVideoComponent } from './chat/calls-video/calls-video.component';
import { CallsOutgoingComponent } from './chat/calls-outgoing/calls-outgoing.component';
import { CallsIncomingComponent } from './chat/calls-incoming/calls-incoming.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { ChatSidebarComponent } from './chat/chat-sidebar/chat-sidebar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EmailComponent } from './email/email.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { EmailPagecontentComponent } from './email/email-pagecontent/email-pagecontent.component';
import { EmailComposeComponent } from './email/email-compose/email-compose.component';
import { EmailEmailviewComponent } from './email/email-emailview/email-emailview.component';
import { HttpClientModule } from '@angular/common/http';
import { AppsServiceService } from './apps-service.service';

@NgModule({
  declarations: [
    ChatComponent,
    AppsComponent,
    ChatProfileComponent,
    CallsSidebarComponent,
    CallsVoiceComponent,
    CallsVideoComponent,
    CallsOutgoingComponent,
    CallsIncomingComponent,
    ChatMessageComponent,
    ChatSidebarComponent,
    CalendarComponent,
    ContactsComponent,
    EmailComponent,
    FileManagerComponent,
    EmailPagecontentComponent,
    EmailComposeComponent,
    EmailEmailviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    FilePondModule,
    FormsModule,
    ReactiveFormsModule,
    AppsRoutingModule,
    NgbModalModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    Ng2SearchPipeModule
  ],
  providers: [
    AppsServiceService,
  ]
})
export class AppsModule { }
