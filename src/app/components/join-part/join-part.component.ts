import {Component, OnInit} from '@angular/core';
import {PlayDuoService} from '../../services/play/play-duo.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SnackbarService} from '../../services/snackbar.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {RoomJoinService} from '../../services/mindory-api/room/room-join.service';

@Component({
  selector: 'app-join-part',
  templateUrl: './join-part.component.html',
  styleUrls: ['./join-part.component.css']
})
export class JoinPartComponent implements OnInit {

  buttonCreatePart = false;

  constructor(
    public playDuoService: PlayDuoService,
    private formBuilder: FormBuilder,
    private snackBar: SnackbarService,
    public router: Router,
    public localStorageService: LocalStorageService,
    private roomJoinService: RoomJoinService
  ) { }

  createKeyWordForm: FormGroup = this.formBuilder.group({
    keyWord: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
  });

  ngOnInit(): void {
  }

  public postKeyWordForm(): void {
    if (this.createKeyWordForm.invalid && !this.createKeyWordForm.dirty) {
      return;
    }
    this.roomJoinService.validateRoomWithKeyWord(this.createKeyWordForm.get('keyWord').value);
  }


}
