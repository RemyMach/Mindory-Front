import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {PlaySoloComponent} from './components/play-solo/play-solo.component';
import {PlayModeComponent} from './components/play-mode/play-mode.component';
import {PlayDeckComponent} from './components/play-deck/play-deck.component';
import {PlayDuoComponent} from './components/play-duo/play-duo.component';
import {PlayDuoChoiceLinkComponent} from './components/play-duo-choice-link/play-duo-choice-link.component';
import {JoinPartComponent} from './components/join-part/join-part.component';
import {CreatePartComponent} from './components/create-part/create-part.component';
import {TokenValidGuard} from './guard/token-valid.guard';
import {AdminDecksListComponent} from './components/admin/decks-list/admin-decks-list.component';
import {AboutComponent} from './components/about/about.component';
import {LegalNoticeComponent} from './components/legal-notice/legal-notice.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'legal', component: LegalNoticeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'subscribe', component: SubscribeComponent},
  {path: 'forget', component: ForgetPasswordComponent},
  {path: 'reset/:token', component: ResetPasswordComponent},
  {path: 'play/mode', component: PlayModeComponent},
  {path: 'play/decks', component: PlayDeckComponent},
  {path: 'play/solo/decks/:deckTitle', component: PlaySoloComponent},
  {path: 'play/duo/link', component: PlayDuoChoiceLinkComponent},
  {path: 'play/duo/:token', component: PlayDuoComponent, canActivate: [TokenValidGuard]},
  {path: 'play/decks/load/refresh', component: PageNotFoundComponent},
  {path: 'play/create', component: CreatePartComponent},
  {path: 'play/join', component: JoinPartComponent},
  {path: 'admin/decks', component: AdminDecksListComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
