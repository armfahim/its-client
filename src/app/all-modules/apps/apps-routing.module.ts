import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat/chat.component';
import { AppsComponent } from './apps.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { EmailPagecontentComponent } from './email/email-pagecontent/email-pagecontent.component';
import { EmailComposeComponent } from './email/email-compose/email-compose.component';
import { EmailEmailviewComponent } from './email/email-emailview/email-emailview.component';

const routes: Routes = [
  {
    path: '',
    component: AppsComponent,
    children: [
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'contacts',
        component: ContactsComponent
      },
      {
        path: 'email',
        component: EmailPagecontentComponent
      },
      {
        path: 'mailview',
        component: EmailEmailviewComponent
      },
      {
        path:'compose',
        component:EmailComposeComponent
      },
      {
        path: 'file-manager',
        component: FileManagerComponent
      }
    ]
  },
  {
    path: 'calls',
    component: AppsComponent,
    children : [
      {
        path: '',
        redirectTo: 'voice'
      },
      {
        path: 'voice',
        component: ChatComponent
      },
      {
        path: 'video',
        component: ChatComponent
      },
      
      {
        path: 'outgoing',
        component: ChatComponent
      },
      {
        path: 'incoming',
        component: ChatComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
