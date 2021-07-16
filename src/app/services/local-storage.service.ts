import {Injectable} from '@angular/core';
import {UserModel} from '../models/User.model';
import {SessionModel} from '../models/session.model';
import {ParamGameModel, ParamGameProps} from '../models/paramGame.model';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {

  user: UserModel | null;
  session: SessionModel | null;
  paramGame: ParamGameProps | null;

  constructor() { }

  updateLocalStorageAttributes(): void {
    this.user = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null;
    this.session = localStorage.getItem('session') !== null && this.validSessionFormat() ? JSON.parse(localStorage.getItem('session')) : null;
    this.paramGame = localStorage.getItem('paramGame') !== null ? JSON.parse(localStorage.getItem('paramGame')) : null;
  }

  setUser(userSession: UserModel): void {
    localStorage.setItem('user', JSON.stringify(userSession));
  }

  setSession(session: SessionModel): void {
    localStorage.setItem('session', JSON.stringify(session));
  }
  validSessionFormat(): boolean {
    try {
      JSON.parse(localStorage.getItem('session'));
      return true;
    }catch {
      return false;
    }
  }
  setParamGame(paramGameProps: ParamGameProps): void{
    const object = JSON.parse(localStorage.getItem('paramGame'));
    let paramGameModel: ParamGameModel;
    if (object !== null) {
      paramGameModel = new ParamGameModel(object);
      paramGameModel.deckId = paramGameProps.deckId  ? paramGameProps.deckId : paramGameModel.deckId;
      paramGameModel.mode = paramGameProps.mode  ? paramGameProps.mode : paramGameModel.mode;
      paramGameModel.link = paramGameProps.link  ? paramGameProps.link : paramGameModel.link;
      paramGameModel.time = paramGameProps.time  ? paramGameProps.time : paramGameModel.time;
    }else {
      paramGameModel = new ParamGameModel(paramGameProps);
    }
    localStorage.setItem('paramGame', JSON.stringify(paramGameModel));
  }

  deleteParamGame(): void {
    localStorage.removeItem('paramGame');
  }
  deleteSession(): void {
    localStorage.removeItem('session');
  }
  getSessionToken(): string {
    this.updateLocalStorageAttributes();
    if (this.session) {
      return 'Bearer ' + this.session.token;
    }
  }

  getParamGame(): ParamGameProps | null {
    this.updateLocalStorageAttributes();
    return this.paramGame;
  }
}
