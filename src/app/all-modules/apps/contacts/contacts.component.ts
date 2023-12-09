import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";
import { AllModulesService } from "../../all-modules.service";
import { ToastrService } from "ngx-toastr";

declare const $: any;

@Component({
  selector: "app-contacts",
  templateUrl: "./contacts.component.html",
  styleUrls: ["./contacts.component.css"],
})
export class ContactsComponent implements OnInit {
  public addContactForm: FormGroup;
  public editContactForm: FormGroup;
  public allContacts: any = [];
  public contactSidebar = ["company", "client", "staff"];
  public tempId: any;
  public editId: any;
  public searchText: any;
  public url: any = "contacts";

  constructor(
    private formBuilder: FormBuilder,
    private allModuleService: AllModulesService,
    private toastr: ToastrService
  ) {}
  // Get All Contacts Method

  getContact() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allContacts = data;
    });
  }

  ngOnInit() {
    this.getContact();

    // Add Contact Form Validation And Getting Values

    this.addContactForm = this.formBuilder.group({
      contactName: ["", [Validators.required]],
      contactNumber: ["", [Validators.required]],
      contactEmail: ["", [Validators.required]],
    });

    // Edit Contact Form Validation And Getting Values

    this.editContactForm = this.formBuilder.group({
      editContactName: ["", [Validators.required]],
      editContactEmail: ["", [Validators.required]],
      editContactNumber: ["", [Validators.required]],
    });
  }

  // Add Contact Modal Api Call

  addContact() {
    if (this.addContactForm.valid) {
      let obj = {
        name: this.addContactForm.value.contactName,
        role: "Web Developer",
        type: "company",
        number: this.addContactForm.value.contactNumber,
        email: this.addContactForm.value.contactEmail,
        id: 256,
      };
      this.allModuleService.add(obj, this.url).subscribe((data) => {});
      this.getContact();
      $("#add_contact").modal("hide");
      this.addContactForm.reset();
      this.toastr.success("Contacts added", "Success");
    }
  }

  // Edit Contact Modal Api Call

  editContact() {
    let obj = {
      name: this.editContactForm.value.editContactName,
      role: "Web Developer",
      type: "company",
      number: this.editContactForm.value.editContactNumber,
      email: this.editContactForm.value.editContactEmail,
      id: this.editId,
    };
    this.allModuleService.update(obj, this.url).subscribe((data1) => {});
    this.getContact();
    $("#edit_contact").modal("hide");
    this.toastr.success("Contact updated", "Success");
  }

  // Delete Contact Modal Api Call

  deleteContact() {
    this.allModuleService.delete(this.tempId, this.url).subscribe((data) => {
      this.getContact();
      $("#delete_contact").modal("hide");
      this.toastr.success("Contact deleted", "Success");
    });
  }

  // To Get The User Edit Id And Set Values To Edit Modal Form

  edit(value) {
    this.editId = value;
    const index = this.allContacts.findIndex((item) => {
      return item.id === value;
    });
    let toSetValues = this.allContacts[index];
    this.editContactForm.setValue({
      editContactName: toSetValues.name,
      editContactEmail: toSetValues.email,
      editContactNumber: toSetValues.number,
    });
  }
}
