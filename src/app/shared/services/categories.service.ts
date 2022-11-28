import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CategoryInterface } from '../models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
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
}
