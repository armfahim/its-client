import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"],
})
export class AdminDashboardComponent implements OnInit {
  public chartData;
  public chartOptions;
  public lineData;
  public lineOption;
  public barColors = {
    a: "#667eea",
    b: "#764ba2",
  };
  public lineColors = {
    a: "#667eea",
    b: "#764ba2",
  };

  constructor() { }

  ngOnInit() {
    this.chartOptions = {
      xkey: "y",
      ykeys: ["a", "b"],
      labels: ["Total Income", "Total Outcome"],
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
      ykeys: ["a", "b"],
      labels: ["Total Sales", "Total Revenue"],
      resize: true,
      lineColors: [this.lineColors.a, this.lineColors.b],
    };

    this.lineData = [
      { y: '2006', a: 50, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 50 }
    ];
  }
}
