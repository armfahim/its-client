import { Component, OnInit } from '@angular/core';
import { AllModulesService } from "../../all-modules.service";
declare const $: any;
@Component({
  selector: 'app-taskreports-list',
  templateUrl: './taskreports-list.component.html',
  styleUrls: ['./taskreports-list.component.css']
})
export class TaskreportsListComponent implements OnInit {
public url: any = "taskreports";
lstStudents
  constructor(private srvModuleService: AllModulesService) { }

  ngOnInit() {
  		// Floating Label

	if($('.floating').length > 0 ){
		$('.floating').on('focus blur', function (e) {
		$(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
	}
  	this.loadStudents(); 
  }
    // Get Students List  Api Call
  loadStudents() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstStudents = data;
     
    });
  }

}
