import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.css']
})
export class DataTablesComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      // ... skipped ...
      dom: 'lrtip'
   }
  }

}
