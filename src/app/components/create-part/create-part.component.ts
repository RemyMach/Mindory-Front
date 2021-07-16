import {Component, OnInit} from '@angular/core';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../../services/snackbar.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.css']
})
export class CreatePartComponent implements OnInit {

  informationSentence: string;

  constructor(
    public playDuoService: PlayDuoService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    public router: Router,
    public localStorageService: LocalStorageService
  ) { }

  createKeyWordForm: FormGroup = this.formBuilder.group({
    keyWord: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  });

  ngOnInit(): void {
    this.playDuoService.getActualRoomWithoutSocket();
    this.formatInformationSentence();
  }


  public postKeyWordForm(): void {
    if (this.createKeyWordForm.invalid && !this.createKeyWordForm.dirty) {
      return;
    }
    this.playDuoService.buttonCreatePart = true;
    this.playDuoService.createKeywordForARoom(this.createKeyWordForm.get('keyWord').value);
  }

  private formatInformationSentence(): void {
    if(this.localStorageService.getSessionToken())
      this.informationSentence = 'Vous pouvez choisir d\'envoyez l\'URL ci-dessous à l\'autre personne ou de générer un mot de passe qu\'elle pourra rentréelle même dans la partie rejoindre partie';
    else
      this.informationSentence = 'Vous pouvez envoyez cette Url à l\'autre personne';
  }

}
