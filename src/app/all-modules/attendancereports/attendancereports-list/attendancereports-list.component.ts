import { Component, OnInit } from '@angular/core';
import { AllModulesService } from "../../all-modules.service";
declare const $: any;
@Component({
  selector: 'app-attendancereports-list',
  templateUrl: './attendancereports-list.component.html',
  styleUrls: ['./attendancereports-list.component.css']
})
export class AttendancereportsListComponent implements OnInit {
public url: any = "attendancereports";
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
