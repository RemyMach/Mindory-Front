import { Component, OnInit } from '@angular/core';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/mindory-api/auth.service';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-create-part',
  templateUrl: './create-part.component.html',
  styleUrls: ['./create-part.component.css']
})
export class CreatePartComponent implements OnInit {

  constructor(
    public playDuoService: PlayDuoService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService
  ) { }

  createKeyWordForm: FormGroup = this.formBuilder.group({
    keyWord: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  });

  ngOnInit(): void {
    this.playDuoService.getActualRoom();
  }


  public postKeyWordForm(): void {
    if (this.createKeyWordForm.invalid && !this.createKeyWordForm.dirty) {
      return;
    }
    this.playDuoService.buttonCreatePart = true;
    this.playDuoService.createKeywordForARoom(this.createKeyWordForm.get('keyWord').value);
    this.playDuoService.getActualRoom();
  }

}
