import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiUrl: string = environment.usersUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<UserInterface[]>(this.apiUrl);
  }

  postUser(data: any) {
    return this.http.post<UserInterface>(this.apiUrl, data);
  }

  putUser(data: UserInterface, id: number) {
    return this.http.put<any>(this.apiUrl + id, data);
  }

  deleteUser(id: number) {
    return this.http.delete<any>(this.apiUrl + id);
  }
}
