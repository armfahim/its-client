import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule) },
  { path: 'error', loadChildren: () => import(`./errorpages/errorpages.module`).then(m => m.ErrorpagesModule) },
  { path: '', loadChildren: () => import(`./all-modules/all-modules.module`).then(m => m.AllModulesModule),canActivate:[UserGuard] },
  { path: '**', loadChildren: () => import(`./login/login.module`).then(m => m.LoginModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
