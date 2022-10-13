import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from 'src/app/admin/services/admin-products.service';
import { AdminUsersService } from 'src/app/admin/services/admin-users.service';

import { ProductInterface } from 'src/app/shared/models/product.interface';
import { UserInterface } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  users?: UserInterface[];
  products?: ProductInterface[];

  //Demo data slider
  data = [
    {
      img: 'https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img1.jpg',
      title: 'Slide 1',
    },
    {
      img: 'https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img2.jpg',
      title: 'Slide 2',
    },
    {
      img: 'https://therichpost.com/wp-content/uploads/2021/05/bootstrap5-carousel-slider-img3.jpg',
      title: 'Slide 3',
    },
  ];

  constructor(
    private productsService: AdminProductsService,
    private usersService: AdminUsersService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllProducts();
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (res: UserInterface[]) => {
        this.users = res;
      },
      error: (err) => {
        alert('Error while fetching the users!');
      },
    });
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe({
      next: (res: ProductInterface[]) => {
        this.products = res;
      },
      error: (err) => {
        alert('Error while fetching the products!');
      },
    });
  }
}
