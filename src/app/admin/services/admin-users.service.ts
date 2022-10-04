import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
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
