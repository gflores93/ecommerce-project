import { Component, OnInit } from '@angular/core';
import { AdminProductsService } from 'src/app/admin/services/admin-products.service';
import { AdminUsersService } from 'src/app/admin/services/admin-users.service';

import { ProductInterface } from 'src/app/shared/models/product.interface';
import { UserInterface } from 'src/app/shared/models/user.interface';

import {
  Chart,
  ChartConfiguration,
  ChartItem,
  registerables
} from 'node_modules/chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users?: UserInterface[];
  products?: ProductInterface[];

  constructor(
    private productsService: AdminProductsService,
    private usersService: AdminUsersService
  ) {}

  ngOnInit(): void {
    // Chart data
    this.createChart();

    this.getAllUsers();
    this.getAllProducts();
  }

  createChart(): void {
    Chart.register(...registerables);
    const data = {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      datasets: [
        {
          label: 'Profile Visit',
          backgroundColor: 'rgb(29, 63, 129)',
          borderColor: 'rgb(29, 63, 129)',
          data: [10, 5, 2, 20, 30, 45, 10, 5, 12, 20, 30, 45, 12, 24]
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: false
        }
      }
    };
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: options
    };

    const chartItem: ChartItem = document.getElementById(
      'my-chart'
    ) as ChartItem;
    new Chart(chartItem, config);
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (res: UserInterface[]) => {
        this.users = res;
      },
      error: (err) => {
        alert('Error while fetching the users!');
      }
    });
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe({
      next: (res: ProductInterface[]) => {
        this.products = res;
      },
      error: (err) => {
        alert('Error while fetching the products!');
      }
    });
  }
}
