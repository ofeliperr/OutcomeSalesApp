import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://localhost:7249/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  getProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/category/${categoryId}`);
  }

  getBrandsByProduct(productId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/products/${productId}/brands`);
  }

  getSalesByBrand(brandId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/sales/brand/${brandId}`);
  }
}
