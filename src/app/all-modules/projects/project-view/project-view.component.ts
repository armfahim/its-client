import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";
import { ActivatedRoute } from "@angular/router";
import { map, mergeMap } from "rxjs/operators";

@Component({
  selector: "app-project-view",
  templateUrl: "./project-view.component.html",
  styleUrls: ["./project-view.component.css"],
})
export class ProjectViewComponent implements OnInit {
  public projects = [];
  public projectId: any;
  public project: any;
  public projectTitle;
  public projectStart;
  public projectEnd;

  constructor(
    private allModulesService: AllModulesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((id) => {
          this.projectId = id.id;
        }),
        mergeMap(() => this.allModulesService.get("projects"))
      )
      .subscribe((data) => {
        this.projects = data;
        this.project = this.projects.filter(
          (client) => client.id == this.projectId
        );
        this.projectTitle = this.project[0].name;
        this.projectStart = this.project[0].startDate;
        this.projectEnd = this.project[0].endDate;
      });
  }
}
