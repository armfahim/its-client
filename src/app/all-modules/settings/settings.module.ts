import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { CompanySettingsComponent } from './company-settings/company-settings.component';
import { LocalizationComponent } from './localization/localization.component';
import { ThemeSettingsComponent } from './theme-settings/theme-settings.component';
import { RoleComponent } from './role/role.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { InvoiceSettingsComponent } from './invoice-settings/invoice-settings.component';
import { SalarySettingsComponent } from './salary-settings/salary-settings.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TokboxComponent } from './tokbox/tokbox.component';
import { CronComponent } from './cron/cron.component';
import { PerformanceComponent } from './performance/performance.component';
import { ApprovalComponent } from './approval/approval.component';

@NgModule({
  declarations: [SettingsComponent, CompanySettingsComponent, LocalizationComponent, ThemeSettingsComponent, RoleComponent, EmailSettingsComponent, InvoiceSettingsComponent, SalarySettingsComponent, NotificationsComponent, ChangePasswordComponent, LeaveTypeComponent, TokboxComponent, CronComponent, PerformanceComponent, ApprovalComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SettingsModule { }
