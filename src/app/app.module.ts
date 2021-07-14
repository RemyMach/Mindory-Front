import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoaderComponent} from './components/loader/loader.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoaderInterceptorService} from './interceptors/loader-interceptors.service';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {SubscribeComponent} from './components/subscribe/subscribe.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {SnackbarComponent} from './components/snackbar/snackbar.component';

import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {DialogConfirmationComponent} from './components/dialog-confirmation/dialog-confirmation.component';
import {HeaderLoginComponent} from './components/header-login/header-login.component';
import {ForgetPasswordComponent} from './components/forget-password/forget-password.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {DeckExampleComponent} from './components/deck-example/deck-example.component';
import {BannerPlayComponent} from './components/banner-play/banner-play.component';
import {PlaySoloComponent} from './components/play-solo/play-solo.component';
import {CardComponent} from './components/card/card.component';
import {GameBoardComponent} from './components/game-board/game-board.component';
import {PlayModeComponent} from './components/play-mode/play-mode.component';
import {CardChoiceComponent} from './components/card-choice/card-choice.component';
import {PlayDeckComponent} from './components/play-deck/play-deck.component';
import {CardDeckComponent} from './components/card-deck/card-deck.component';
import {PlayDuoComponent} from './components/play-duo/play-duo.component';
import {PlayDuoChoiceLinkComponent} from './components/play-duo-choice-link/play-duo-choice-link.component';
import {JoinPartComponent} from './components/join-part/join-part.component';
import {CreatePartComponent} from './components/create-part/create-part.component';
import {CardDuoComponent} from './components/card-duo/card-duo.component';
import {AboutComponent} from './components/about/about.component';
import {AdminDecksListComponent} from './components/admin/decks-list/admin-decks-list.component';
import {AdminDecksTabComponent} from './components/admin/deck-tab/admin-decks-tab.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { DataComponent } from './components/data/data.component';
import { ContactComponent } from './components/contact/contact.component';
import { DeckEditorComponent } from './components/admin/deck-editor/deck-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    LoginComponent,
    HomeComponent,
    SubscribeComponent,
    PageNotFoundComponent,
    SnackbarComponent,
    DialogConfirmationComponent,
    HeaderLoginComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    HeaderComponent,
    FooterComponent,
    DeckExampleComponent,
    BannerPlayComponent,
    PlaySoloComponent,
    CardComponent,
    GameBoardComponent,
    PlayModeComponent,
    CardChoiceComponent,
    PlayDeckComponent,
    CardDeckComponent,
    PlayDuoComponent,
    PlayDuoChoiceLinkComponent,
    JoinPartComponent,
    CreatePartComponent,
    CardDuoComponent,
    AboutComponent,
    AdminDecksListComponent,
    AdminDecksTabComponent,
    LegalNoticeComponent,
    DataComponent,
    ContactComponent,
    DeckEditorComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDividerModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        FormsModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
