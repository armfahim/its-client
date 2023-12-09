import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllModulesComponent } from './all-modules.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AllModulesComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
      },
      {
        path: 'clients',
        loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'leads',
        loadChildren: () => import('./leads/leads.module').then(m => m.LeadsModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule)
      },
      {
        path: 'accounts',
        loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule)
      },
      {
        path: 'payroll',
        loadChildren: () => import('./payroll/payroll.module').then(m => m.PayrollModule)
      },
      {
        path: 'policies',
        loadChildren: () => import('./policies/policies.module').then(m => m.PoliciesModule)
      },
      {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule)
      },
      {
        path: 'performance',
        loadChildren: () => import('./performance/performance.module').then(m => m.PerformanceModule)
      },
      {
        path: 'goals',
        loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule)
      },
      {
        path: 'training',
        loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)
      },
      {
        path: 'promotion',
        loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule)
      },
      {
        path: 'resignation',
        loadChildren: () => import('./resignation/resignation.module').then(m => m.ResignationModule)
      },
      {
        path: 'termination',
        loadChildren: () => import('./termination/termination.module').then(m => m.TerminationModule)
      },
      {
        path: 'assets',
        loadChildren: () => import('./assets/assets.module').then(m => m.AssetsModule)
      },
      {
        path: 'jobs',
        loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule)
      },
      {
        path: 'knowledgebase',
        loadChildren: () => import('./knowledgebase/knowledgebase.module').then(m => m.KnowledgebaseModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
      },
       {
        path: 'components',
        loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./forms/forms.module').then(m => m.FormsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'scheduling',
        loadChildren: () => import('./scheduling/scheduling.module').then(m => m.SchedulingModule)
      },
      {
        path: 'shift',
        loadChildren: () => import('./shift/shift.module').then(m => m.ShiftModule)
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'budget',
        loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
      },
      {
        path: 'budgetexpenses',
        loadChildren: () => import('./budgetexpenses/budgetexpenses.module').then(m => m.BudgetexpensesModule)
      },
      {
        path: 'budgetrevenues',
        loadChildren: () => import('./budgetrevenues/budgetrevenues.module').then(m => m.BudgetrevenuesModule)
      },
      {
        path: 'paymentreports',
        loadChildren: () => import('./paymentreports/paymentreports.module').then(m => m.PaymentreportsModule)
      },
      {
        path: 'projectreports',
        loadChildren: () => import('./projectreports/projectreports.module').then(m => m.ProjectreportsModule)
      },
      {
        path: 'taskreports',
        loadChildren: () => import('./taskreports/taskreports.module').then(m => m.TaskreportsModule)
      },
      {
        path: 'userreports',
        loadChildren: () => import('./userreports/userreports.module').then(m => m.UserreportsModule)
      },
      {
        path: 'employeereports',
        loadChildren: () => import('./employeereports/employeereports.module').then(m => m.EmployeereportsModule)
      },
      {
        path: 'payslipreports',
        loadChildren: () => import('./payslipreports/payslipreports.module').then(m => m.PayslipreportsModule)
      },
      {
        path: 'attendancereports',
        loadChildren: () => import('./attendancereports/attendancereports.module').then(m => m.AttendancereportsModule)
      },
       {
        path: 'leavereports',
        loadChildren: () => import('./leavereports/leavereports.module').then(m => m.LeavereportsModule)
      },
      {
        path: 'dailyreports',
        loadChildren: () => import('./dailyreports/dailyreports.module').then(m => m.DailyreportsModule)
      },
      {
        path: 'userdashboard',
        loadChildren: () => import('./userdashboard/userdashboard.module').then(m => m.UserdashboardModule)
      },
      {
        path: 'jobsdashboard',
        loadChildren: () => import('./jobsdashboard/jobsdashboard.module').then(m => m.JobsdashboardModule)
      },
      {
        path: 'manageresume',
        loadChildren: () => import('./manageresume/manageresume.module').then(m => m.ManageresumeModule)
      },
      {
        path: 'candidate',
        loadChildren: () => import('./candidate/candidate.module').then(m => m.CandidateModule)
      },
      {
        path: 'interview',
        loadChildren: () => import('./interview/interview.module').then(m => m.InterviewModule)
      },
       {
        path: 'offer',
        loadChildren: () => import('./offer/offer.module').then(m => m.OfferModule)
      },
      {
        path: 'experience',
        loadChildren: () => import('./experience/experience.module').then(m => m.ExperienceModule)
      },
      {
        path: 'studentcandidate',
        loadChildren: () => import('./studentcandidate/studentcandidate.module').then(m => m.StudentcandidateModule)
      },
      {
        path: 'scheduletiming',
        loadChildren: () => import('./scheduletiming/scheduletiming.module').then(m => m.ScheduletimingModule)
      },
      {
        path: 'aptitute',
        loadChildren: () => import('./aptitute/aptitute.module').then(m => m.AptituteModule)
      },
      {
        path: 'useralljobs',
        loadChildren: () => import('./useralljobs/useralljobs.module').then(m => m.UseralljobsModule)
      },
      {
        path: 'savedjobs',
        loadChildren: () => import('./savedjobs/savedjobs.module').then(m => m.SavedjobsModule)
      },
       {
        path: 'appliedjobs',
        loadChildren: () => import('./appliedjobs/appliedjobs.module').then(m => m.AppliedjobsModule)
      },
      {
        path: 'interviewing',
        loadChildren: () => import('./interviewing/interviewing.module').then(m => m.InterviewingModule)
      },
      {
        path: 'offeredjobs',
        loadChildren: () => import('./offeredjobs/offeredjobs.module').then(m => m.OfferedjobsModule)
      },
      {
        path: 'visitedjobs',
        loadChildren: () => import('./visitedjobs/visitedjobs.module').then(m => m.VisitedjobsModule)
      },
      {
        path: 'archivedjobs',
        loadChildren: () => import('./archivedjobs/archivedjobs.module').then(m => m.ArchivedjobsModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllModulesRoutingModule { }
