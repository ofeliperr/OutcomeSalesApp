import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CategoryModel, ProductModel, BrandModel } from '../models';
import { ChartData, Chart, registerables  } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  categories: CategoryModel[] = [];
  products: ProductModel[] = [];
  brands: BrandModel[] = [];
  salesData: any = {};
  barChart: any;
  selectedCategoryId: number = 0;
  selectedProductId: number = 0;
  selectedBrandId: number = 0;

  private colors: string[] = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
    'rgba(255, 0, 0, 1)',
    'rgba(0, 255, 0, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(255, 215, 0, 1)'
  ];

  // Dados do gráfico
  salesChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Vendas',
      data: []
    }]
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onCategoryChange(categoryId: number): void {
    this.selectedProductId = 0;
    this.selectedBrandId = 0;
    this.dataService.getProductsByCategory(categoryId).subscribe(data => {
        this.products = data;
    });
  }

  onProductChange(productId: number): void {
    this.selectedBrandId = 0;
    this.dataService.getBrandsByProduct(productId).subscribe(brands => {
      this.brands = brands;
    });
  }

  onBrandChange(selectedBrandId: number): void {
    this.dataService.getSalesByBrand(selectedBrandId).subscribe(data => {
      this.salesData = data;
      console.log(data);
      this.loadChart();
    });
  }

  loadChart(): void {
    const labels = Object.keys(this.salesData);
    const data = Object.values(this.salesData);

    if (this.barChart) {
      this.barChart.destroy();
    }

    const backgroundColors = data.map((_, index) => this.colors[index % this.colors.length]);
    const borderColors = data.map((_, index) => this.colors[index % this.colors.length]);

    this.barChart = new Chart('salesChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantidade Vendida',
          data: data,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
