import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
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

  // /posts?_page=7&_limit=20
  // /posts?_sort=views&_order=asc
  // /posts?title_like=server

  getPaginatedUsers(
    currentPage: number = 1,
    pageSize: number = 5,
    header: string = 'id',
    direction: string = 'asc',
    filterText: string = ''
  ) {
    const filter = filterText.length ? '&username_like=' + filterText : '';
    // {observe: 'response'} as argument helps to provide extra info as res.headers('X-Total-Count')
    return this.http.get<UserInterface[]>(
      this.apiUrl +
        `?_page=${currentPage}&_limit=${pageSize}&_sort=${header}&_order=${direction}${filter}`,
      {
        observe: 'response'
      }
    );
  }
}
