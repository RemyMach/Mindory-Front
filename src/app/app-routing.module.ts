import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthenticateGuard} from './guard/authenticate.guard';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthenticateGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'subscribe', component: SubscribeComponent},
  {path: 'forget', component: ForgetPasswordComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
