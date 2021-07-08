import {Part} from './part.model';

export interface Room {
  id?: number,
  token: string;
  keyword?: string;
  part?: Part;
}
