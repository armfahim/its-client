import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobsdashboard-list',
  templateUrl: './jobsdashboard-list.component.html',
  styleUrls: ['./jobsdashboard-list.component.css']
})
export class JobsdashboardListComponent implements OnInit {
public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#2196f3",
    b: "#6610f2",
  };
  public lineColors = {
    a: "#373651",
    b: "#E65A26",
    c: "#a1a1a1"
  };
  constructor() { }

  ngOnInit() {
  		this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Series A", "Series B"],
      barColors: [this.barColors.a, this.barColors.b],
    };

    this.chartData = [
      { y: "2006", a: 100, b: 90 },
      { y: "2007", a: 75, b: 65 },
      { y: "2008", a: 50, b: 40 },
      { y: "2009", a: 75, b: 65 },
      { y: "2010", a: 50, b: 40 },
      { y: "2011", a: 75, b: 65 },
      { y: "2012", a: 100, b: 90 },
    ];

    this.lineOption = {
      xkey: "y",
      ykeys: ["a", "b","c"],
      labels: ["UI Developer", "Android", "Web Designing"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b, this.lineColors.c],
    };

    this.lineData = [
      { y: "2006", a: 20, b: 2, c:1 },
      { y: "2007", a: 10, b: 2, c:3 },
      { y: "2008", a: 5, b: 3, c:6 },
      { y: "2009", a: 5, b: 4, c:8 },
      { y: "2010", a: 20, b: 1, c:10 },
    ];
  }

}
