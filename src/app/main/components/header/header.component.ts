import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/main/services/cart.service';
import { SearchService } from 'src/app/main/services/search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;
  public searchText: string = '';
  public user: string = '';

  constructor(
    private cartService: CartService,
    private searchService: SearchService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItem = res?.length ?? 0;
    });
    this.authService.userLogged.subscribe((user) => {
      this.user = user;
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

  logout() {
    this.cartService.removeAllCart();
    this.authService.logout();
  }
}
