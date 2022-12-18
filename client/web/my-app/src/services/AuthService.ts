import api from '../api';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../interfaces/response/AuthResponse';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await api.post<AuthResponse>('/login', { email, password });
  }

  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return await api.post<AuthResponse>('/registration', { email, password });
  }

  static async logout(): Promise<void> {
    return await api.post('/logout');
  }
}
