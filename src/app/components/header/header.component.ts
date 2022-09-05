import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  public searchText: string = '';

  constructor(
    private cartService: CartService,
    private searchService: SearchService
    ) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.totalItem = res?.length ?? 0;
    });
  }

  search(event: any) {
    this.searchText = (event.target as HTMLInputElement).value;
    this.searchService.updateText(this.searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.searchService.updateText(this.searchText);
  }

}
