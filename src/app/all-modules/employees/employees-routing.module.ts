import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { EmployeePageContentComponent } from './all-employees/employee-page-content/employee-page-content.component';
import { EmployeeListComponent } from './all-employees/employee-list/employee-list.component';
import { EmployeeProfileComponent } from './all-employees/employee-profile/employee-profile.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { LeavesAdminComponent } from './leaves-admin/leaves-admin.component';
import { LeavesEmployeeComponent } from './leaves-employee/leaves-employee.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { AttendanceAdminComponent } from './attendance-admin/attendance-admin.component';
import { AttendanceEmployeeComponent } from './attendance-employee/attendance-employee.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { OvertimeComponent } from './overtime/overtime.component';
const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    children: [
      {
        path: 'employeepage',
        component: EmployeePageContentComponent
      },
      {
        path: 'employeelist',
        component: EmployeeListComponent
      },
      {
        path: 'employeeprofile',
        component: EmployeeProfileComponent
      },
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'adminleaves',
        component: LeavesAdminComponent
      },
      {
        path: 'employeeleaves',
        component: LeavesEmployeeComponent
      },
      {
        path: 'leavesettings',
        component: LeaveSettingsComponent
      },
      {
        path: 'attendanceadmin',
        component: AttendanceAdminComponent
      },
      {
        path: 'attendanceemployee',
        component: AttendanceEmployeeComponent
      },
      {
        path: 'departments',
        component: DepartmentsComponent
      },
      {
        path: 'designation',
        component: DesignationComponent
      },
      {
        path: 'timesheet',
        component: TimesheetComponent
      },
      {
        path: 'overtime',
        component: OvertimeComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
