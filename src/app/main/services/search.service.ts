import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Header component emits search text and Product component is subscribed to it to filter products
  public searchText = new BehaviorSubject<string>('');

  constructor() {}

  updateText(value: string) {
    this.searchText.next(value);
  }
}
