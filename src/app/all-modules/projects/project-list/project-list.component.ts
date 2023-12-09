import { DatePipe } from "@angular/common";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

declare const $: any;
@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"],
})
export class ProjectListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  public dtElement: DataTableDirective;
  public dtOptions: DataTables.Settings = {};
  public projects = [];
  public addProjectForm: FormGroup;
  public editProjectForm: FormGroup;
  public tempId: any;

  public rows = [];
  public srch = [];
  public statusValue;
  public dtTrigger: Subject<any> = new Subject();
  public pipe = new DatePipe("en-US");
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private allModulesService: AllModulesService
  ) {}

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      pageLength: 10,
      dom: "lrtip",
    };
    this.getProjects();
    //Add Projects form
    this.addProjectForm = this.formBuilder.group({
      projectName: ["", [Validators.required]],
      projectDescription: ["", [Validators.required]],
      projectStartDate: ["", [Validators.required]],
      projectEndDate: ["", [Validators.required]],
      projectPriority: ["", [Validators.required]],
      projectLeader: ["", [Validators.required]],
      addTeamMembers: ["", [Validators.required]],
      projectId: ["", [Validators.required]],
      id: ["", [Validators.required]],
    });

    //Edit Projects Form
    this.editProjectForm = this.formBuilder.group({
      editProjectName: ["", [Validators.required]],
      editProjectDescription: ["", [Validators.required]],
      editProjectStartDate: ["", [Validators.required]],
      editProjectEndDate: ["", [Validators.required]],
      editProjectPriority: ["", [Validators.required]],
      editaddTeamMembers: ["", [Validators.required]],
      editProjectId: ["", [Validators.required]],
      editId: ["", [Validators.required]],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }

  // manually rendering Data table

  rerender(): void {
    $("#datatable").DataTable().clear();
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.projects = [];
    this.getProjects();
    setTimeout(() => {
      this.dtTrigger.next();
    }, 1000);
  }
  getProjects() {
    this.allModulesService.get("projects").subscribe((data) => {
      this.projects = data;
      this.rows = this.projects;
      this.srch = [...this.rows];
    });
  }

  //Edit project
  editProject(id: any) {
    this.tempId = id;
    const index = this.projects.findIndex((item) => {
      return item.id === id;
    });
    let toSetValues = this.projects[index];
    this.editProjectForm.setValue({
      editProjectName: toSetValues.name,
      editProjectDescription: toSetValues.description,
      editProjectEndDate: toSetValues.endDate,
      editProjectStartDate: toSetValues.startDate,
      editProjectPriority: toSetValues.priority,
      editaddTeamMembers: toSetValues.teamMember,
      editProjectId: toSetValues.projectId,
      editId: toSetValues.id,
    });
  }

  //Create New Project
  public addProject() {
    let StartDate = this.pipe.transform(
      this.addProjectForm.value.projectStartDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.addProjectForm.value.projectEndDate,
      "dd-MM-yyyy"
    );
    let newProject = {
      name: this.addProjectForm.value.projectName,
      description: this.addProjectForm.value.projectDescription,
      endDate: EndDate,
      startDate: StartDate,
      priority: this.addProjectForm.value.projectPriority,
      projectleader: this.addProjectForm.value.projectleader,
      teamMember: this.addProjectForm.value.addTeamMembers,
      projectId: "PRO-0012",
    };
    this.allModulesService.add(newProject, "projects").subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getProjects();
    this.addProjectForm.reset();
    $("#create_project").modal("hide");
    this.toastr.success("Project added sucessfully...!", "Success");
  }

  //Save Project
  public saveProject() {
    let StartDate = this.pipe.transform(
      this.editProjectForm.value.editProjectStartDate,
      "dd-MM-yyyy"
    );
    let EndDate = this.pipe.transform(
      this.editProjectForm.value.editProjectEndDate,
      "dd-MM-yyyy"
    );
    let editedProject = {
      name: this.editProjectForm.value.editProjectName,
      description: this.editProjectForm.value.editProjectDescription,
      endDate: EndDate,
      startDate: StartDate,
      priority: this.editProjectForm.value.editProjectPriority,
      teamMember: this.editProjectForm.value.editaddTeamMembers,
      projectId: this.editProjectForm.value.editProjectPriority,
      id: this.tempId,
    };
    this.allModulesService

      .update(editedProject, "projects")
      .subscribe((data) => {
        $("#datatable").DataTable().clear();
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
        });
        this.dtTrigger.next();
      });
    this.getProjects();
    this.editProjectForm.reset();
    $("#edit_project").modal("hide");
    this.toastr.success("Project updated sucessfully...!", "Success");
  }

  //Delete project
  public deleteProject() {
    this.allModulesService.delete(this.tempId, "projects").subscribe((data) => {
      $("#datatable").DataTable().clear();
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
      });
      this.dtTrigger.next();
    });
    this.getProjects();
    $("#delete_project").modal("hide");
    this.toastr.success("Project deleted sucessfully...!", "Success");
  }

  //search by name
  searchName(val) {
    this.rows.splice(0, this.rows.length);
    let temp = this.srch.filter(function (d) {
      val = val.toLowerCase();
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows.push(...temp);
  }
  // for unsubscribe datatable
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
