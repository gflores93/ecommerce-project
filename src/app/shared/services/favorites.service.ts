import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  apiUrl: string = environment.favoritesUrl;

  constructor(private http: HttpClient) {}

  /* receives id and gets back a list of productIds */
  getFavorites(id: number) {
    return this.http.get<any[]>(this.apiUrl + '?id=' + id);
  }

  postFavorite(data: any) {
    return this.http.post<any>(this.apiUrl, data);
  }

  putFavorite(data: any, id: number = 0) {
    return this.http.put<any>(this.apiUrl + id, data);
  }
}
