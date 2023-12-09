import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataTableDirective } from "angular-datatables";
import { ToastrService } from "ngx-toastr";
import { Subject } from "rxjs";
import { AllModulesService } from "../../all-modules.service";

declare const $: any;
@Component({
  selector: "app-task-board",
  templateUrl: "./task-board.component.html",
  styleUrls: ["./task-board.component.css"],
})
export class TaskBoardComponent implements OnInit {
  public lstTasks: any[];
  public lstProgress: any[];
  public lstCompleted: any[];
  public lstInprogress: any[];
  public lstHold: any[];
  public lstReview: any[];
  public url: any = "taskboard";
  public droppedItems: any[] = [];
  public addTaskboardFrom: FormGroup;
  onItemDrop(e: any) {
    // Get the dropped data here

    this.droppedItems.push(e.dragData);
  }

  constructor(
    private toastr: ToastrService,
    private srvModuleService: AllModulesService
  ) { }

  ngOnInit() {
    this.loadTask();
    (this.lstProgress = [
      {
        id: 1,
        taskname: "John deo",
        taskpriority: "Medium",
        duedate: "02-05-2020",
        followers: "John deo",
        status: "Active",
      },
    ]),
      (this.lstCompleted = [
        {
          id: 1,
          taskname: "John smith",
          taskpriority: "Low",
          duedate: "15-08-2020",
          followers: "John deo",
          status: "Active",
        },
      ]),
      (this.lstInprogress = [
        {
          id: 1,
          taskname: "John deo",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
      ]);
    (this.lstHold = [
      {
        id: 1,
        taskname: "John deo",
        taskpriority: "Medium",
        duedate: "02-05-2020",
        followers: "John deo",
        status: "Active",
      },
    ]),
      (this.lstReview = [
        {
          id: 1,
          taskname: "John deo",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
      ]),
      (this.droppedItems = [
        {
          id: 1,
          taskname: "website redesign",
          taskpriority: "Medium",
          duedate: "02-05-2020",
          followers: "John deo",
          status: "Active",
        },
        {
          id: 2,
          taskname: "Make a wireframe",
          taskpriority: "High",
          duedate: "02-05-2020",
          followers: "Richard deo",
          status: "Active",
        },
      ]);
    if ($('[data-toggle="tooltip"]').length > 0) {
      $('[data-toggle="tooltip"]').tooltip();
    }
  }

  addTaskboard() {
    $("#add_task_modal").modal("hide");
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  // // Get tasks  Api Call
  loadTask() {
    this.srvModuleService.get(this.url).subscribe((data) => {
      this.lstTasks = data;
    });
  }

  onsubmit() {
    $("#add_task_board").modal("hide");
  }
  onSubmitUser() {
    $("#assign_user").modal("hide");
  }

  onSubmitLeader() {
    $("#assign_leader").modal("hide");
  }
}
