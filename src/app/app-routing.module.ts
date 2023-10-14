/*
 *   Copyright (c) 2023 Dmantz Technologies Pvt ltd
 *   All rights reserved.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path:'login',component: LoginComponent},
  {path:'forgotpassword',component: ForgotPasswordComponent},
  {
    path:'admin',
    canActivate: [AuthGuard],
    loadChildren:() => import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: '**', component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64],
    relativeLinkResolution: 'corrected'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
