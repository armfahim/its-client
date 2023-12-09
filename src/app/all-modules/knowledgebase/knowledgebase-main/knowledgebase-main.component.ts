import { Component, OnInit } from "@angular/core";
import { AllModulesService } from "../../all-modules.service";

declare const $: any;
@Component({
  selector: "app-knowledgebase-main",
  templateUrl: "./knowledgebase-main.component.html",
  styleUrls: ["./knowledgebase-main.component.css"],
})
export class KnowledgebaseMainComponent implements OnInit {
  public url: any = "knowledgeBase";
  public allKnowledgeBase: any = [];
  constructor(private allModuleService: AllModulesService) {}

  ngOnInit() {
    this.getPolicies();
  }

  getPolicies() {
    this.allModuleService.get(this.url).subscribe((data) => {
      this.allKnowledgeBase = data;
    });
  }
}
