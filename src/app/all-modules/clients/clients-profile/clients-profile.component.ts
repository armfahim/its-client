import { Component, OnInit } from '@angular/core';
import { AllModulesService } from '../../all-modules.service';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-clients-profile',
  templateUrl: './clients-profile.component.html',
  styleUrls: ['./clients-profile.component.css']
})
export class ClientsProfileComponent implements OnInit {
  public allClients = [];
  public client = [];
  public clientId;
  
  constructor(private allModulesService: AllModulesService,
              private route: ActivatedRoute) { }

    

  ngOnInit() {
    this.route.params.pipe(map(id => {
      this.clientId = id.id;
    }), mergeMap(() => this.allModulesService.get('clients'))).subscribe(data => {
      this.allClients = data;
      this.client = this.allClients.filter(client => client.id == this.clientId);
    });
  }

}
