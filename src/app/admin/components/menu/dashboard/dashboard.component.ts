import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AdminUsersService } from 'src/app/admin/services/admin-users.service';
import { AdminProductsService } from 'src/app/admin/services/admin-products.service';
import { AdminCategoriesService } from 'src/app/admin/services/admin-categories.service';

import { UserInterface } from 'src/app/shared/models/user.interface';
import { ProductInterface } from 'src/app/shared/models/product.interface';
import { CategoryInterface } from 'src/app/shared/models/category.interface';

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
  user?: string;
  email?: string;

  users?: UserInterface[];
  products?: ProductInterface[];
  categories?: CategoryInterface[];

  constructor(
    private authService: AuthService,
    private productsService: AdminProductsService,
    private usersService: AdminUsersService,
    private categoriesService: AdminCategoriesService
  ) {}

  ngOnInit(): void {
    this.authService.userLogged.subscribe((user) => {
      this.user = user;
    });

    // Chart creation
    this.createViewsChart();

    this.getAllUsers();
    this.getAllProducts();
    this.getAllCategories();
  }

  createViewsChart(): void {
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
          label: 'Monthly Views',
          backgroundColor: 'rgb(29, 63, 129)',
          borderColor: 'rgb(29, 63, 129)',
          data: [10, 5, 2, 20, 30, 39, 10, 5, 12, 20, 30, 42]
        }
      ]
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          display: true
        }
      }
    };
    const config: ChartConfiguration = {
      type: 'bar',
      data: data,
      options: options
    };

    const chartItem: ChartItem = document.getElementById(
      'views-chart'
    ) as ChartItem;
    new Chart(chartItem, config);
  }

  createCategoriesChart(): void {
    Chart.register(...registerables);
    // Create an object with {category: count}
    const categoryObj: any = {};
    this.products?.forEach((p: ProductInterface) => {
      if (p.categoryId > 1 && p.active && p.category)
        categoryObj[p.category.name] = (categoryObj[p.category.name] || 0) + 1;
    });
    console.log('catObj', categoryObj);

    const data = {
      labels: Object.keys(categoryObj),
      datasets: [
        {
          label: 'Dataset',
          data: <number[]>Object.values(categoryObj),
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(34, 192, 134)',
            'rgb(160, 121, 239)'
          ],
          hoverOffset: 4
          // tooltip: {
          //   callbacks: {
          //     label: function (context: any) {
          //       let label = context.label;
          //       let value = context.formattedValue;

          //       if (!label) label = 'Unknown';

          //       let sum = 0;
          //       let dataArr = context.chart.data.datasets[0].data;
          //       dataArr.map((data: any) => {
          //         sum += Number(data);
          //       });

          //       let percentage = ((value * 100) / sum).toFixed(2) + '%';
          //       return label + ': ' + percentage;
          //     }
          //   }
          // }
        }
      ]
    };

    const config: ChartConfiguration = {
      type: 'pie',
      data: data
    };

    const chartItem: ChartItem = document.getElementById(
      'categories-chart'
    ) as ChartItem;
    new Chart(chartItem, config);
  }

  getAllUsers() {
    this.usersService.getUsers().subscribe({
      next: (res: UserInterface[]) => {
        this.users = res;
        this.email = this.users.find((u) => u.username == this.user)?.email;
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
        this.createCategoriesChart();
      },
      error: (err) => {
        alert('Error while fetching the products!');
      }
    });
  }

  getAllCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (res: CategoryInterface[]) => {
        this.categories = res;
      },
      error: (err) => {
        alert('Error while fetching the categories!');
      }
    });
  }
}
