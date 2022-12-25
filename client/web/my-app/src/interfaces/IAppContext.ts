import { IUser } from './IUser';

export interface IAppContext {
  user: IUser | null;
  setUser: Function;
}
