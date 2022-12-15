import api from "../api";
import {AxiosResponse} from "axios";
import { IUser } from "../interfaces/IUser";


export default class UserService {
    static async getUsers():Promise<AxiosResponse<IUser[]>> {
        return api.get<IUser[]>("/users"); 
    }
}