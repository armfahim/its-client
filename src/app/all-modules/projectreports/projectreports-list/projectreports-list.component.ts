import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
declare const $: any;

@Component({
  selector: 'app-projectreports-list',
  templateUrl: './projectreports-list.component.html',
  styleUrls: ['./projectreports-list.component.css']
})
export class ProjectreportsListComponent implements OnInit {
	public url: any = "projectreports";
  public tempId: any;
  public editId: any;
  public lstProjectreports;
  public rows = [];
  public srch = [];
  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }


  ngOnInit() {
  // Floating Label

  if($('.floating').length > 0 ){
    $('.floating').on('focus blur', function (e) {
    $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');
  }
  	this.LoadProjectreports();
  }
  // Get department list  Api Call
  LoadProjectreports() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstProjectreports = data;
      this.rows = this.lstProjectreports;
      this.srch = [...this.rows];
      });
  }

  //search by Status
  searchStatus(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.status.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }

}
