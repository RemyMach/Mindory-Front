import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {AuthenticateGuard} from './guard/authenticate.guard';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {PlaySoloComponent} from './components/play-solo/play-solo.component';
import {PlayModeComponent} from './components/play-mode/play-mode.component';
import {PlayDeckComponent} from './components/play-deck/play-deck.component';
import {PlayDeckDuoComponent} from './components/play-deck-duo/play-deck-duo.component';
import {PlayDuoComponent} from './components/play-duo/play-duo.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'subscribe', component: SubscribeComponent},
  {path: 'forget', component: ForgetPasswordComponent},
  {path: 'reset/:token', component: ResetPasswordComponent},
  {path: 'play/mode', component: PlayModeComponent},
  {path: 'play/decks', component: PlayDeckComponent},
  {path: 'play/solo/decks/:deckTitle', component: PlaySoloComponent},
  {path: 'play/duo/decks/:deckTitle', component: PlayDuoComponent},
  {path: 'play/decks/load/refresh', component: PageNotFoundComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
