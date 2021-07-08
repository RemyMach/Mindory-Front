import {UserModel} from './User.model';
import {Room} from './room.model';

export interface UserSocket {
  socketId: string;
  user?: UserModel;
  room?: Room;
}

