import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";
declare const $: any;
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
public url: any = "categories";
  public tempId: any;
  public editId: any;
  public addCategoriesForm: FormGroup;
  public editCategoriesForm: FormGroup;
  public lstCategories;
  public editedvalue;
  constructor(
  	private formBuilder: FormBuilder,
    private srvModuleService: AllModulesService,
    private toastr: ToastrService
  	) { }

  ngOnInit() {
  	this.LoadCategories();

    this.addCategoriesForm = this.formBuilder.group({
      CategoriesName: ["", [Validators.required]],
    });

    this.editCategoriesForm = this.formBuilder.group({
      CategoriesName: ["", [Validators.required]],
    });
  }
  // Get department list  Api Call
  LoadCategories() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstCategories = data;
      });
  }

   // Add Department  Modal Api Call
  addCategories() {
    if (this.addCategoriesForm.valid) {
      let obj = {
        categoryname: this.addCategoriesForm.value.CategoriesName,
        id: 0,
        subcategoryname: "Hardware expenses"
      };
      this.srvModuleService.add(obj, this.url).subscribe((data) => {
       
      });
      this.LoadCategories();
      $("#add_categories").modal("hide");
      this.addCategoriesForm.reset();
      this.toastr.success("Categories added sucessfully...!", "Success");
    }
  }


  editCategories() {
    if (this.editCategoriesForm.valid) {
      let obj = {
        categoryname: this.editCategoriesForm.value.CategoriesName,
        subcategoryname: this.editedvalue,
        id: this.editId,

      };
      this.srvModuleService.update(obj, this.url).subscribe((data1) => {
        
      });
      this.LoadCategories();
      $("#edit_categories").modal("hide");
      this.toastr.success("Categories Updated sucessfully...!", "Success");
    }
  }

  // To Get The department Edit Id And Set Values To Edit Modal Form
  edit(value) {
  	this.editedvalue = value.subcategoryname
    this.editId = value.id;
    const index = this.lstCategories.findIndex((item) => {
      return item.id === value.id;
    });
    let toSetValues = this.lstCategories[index];
    this.editCategoriesForm.setValue({
      CategoriesName: toSetValues.categoryname,
    });
  }


}
