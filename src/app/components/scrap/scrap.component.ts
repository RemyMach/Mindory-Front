import { Component, OnInit } from '@angular/core';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../../services/snackbar.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {RoomJoinService} from '../../services/mindory-api/room/room-join.service';
import {ScrapPictureService} from '../../services/scrap-api/scrap-picture.service';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.css']
})
export class ScrapComponent implements OnInit {

  buttonCreatePart = false;

  constructor(
    public playDuoService: PlayDuoService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    public router: Router,
    public localStorageService: LocalStorageService,
    private roomJoinService: RoomJoinService,
    private scrapPictureService: ScrapPictureService
  ) { }

  scrapForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  public scrapApi(): void {
    if (this.scrapForm.invalid && !this.scrapForm.dirty) {
      return;
    }
    this.scrapPictureService.scrapPicturesWithApi(this.scrapForm.get('name').value);
  }

}
