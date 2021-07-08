import {Shot} from './shot.model';

export interface Part {
  id?: number;
  time?: number;
  Shots?: Shot[];
}

