import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryInterface } from 'src/app/shared/models/category.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminCategoriesService {
  apiUrl: string = environment.categoriesUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<CategoryInterface[]>(this.apiUrl);
  }

  postCategory(data: CategoryInterface) {
    return this.http.post<any>(this.apiUrl, data);
  }

  putCategory(data: CategoryInterface, id: number) {
    return this.http.put<any>(this.apiUrl + id, data);
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(this.apiUrl + id);
  }

  // /posts?_page=7&_limit=20
  // /posts?_sort=views&_order=asc
  // /posts?title_like=server

  getPaginatedCategories(
    currentPage: number = 1,
    pageSize: number = 5,
    header: string = 'id',
    direction: string = 'asc',
    filterText: string = ''
  ) {
    const filter = filterText.length ? '&name_like=' + filterText : '';
    // {observe: 'response'} as argument helps to provide extra info as res.headers('X-Total-Count')
    return this.http.get<CategoryInterface[]>(
      this.apiUrl +
        `?_page=${currentPage}&_limit=${pageSize}&_sort=${header}&_order=${direction}${filter}`,
      {
        observe: 'response'
      }
    );
  }
}
