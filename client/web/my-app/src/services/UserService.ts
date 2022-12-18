import { AxiosResponse } from 'axios';
import api from '../api';
import { IUser } from '../interfaces/IUser';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await api.get<IUser[]>('/users');
  }
}
