import { ProductService } from './../../services/product/product.service';

import { Component, inject, signal } from '@angular/core';
import { ProductCard } from "../product-card/product-card";
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products',
  imports: [ProductCard, CommonModule, MatProgressSpinnerModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products  {
  // products = signal<Product[]>([]);
  ProductService = inject(ProductService);

  products = toSignal(this.ProductService.getProducts(), {initialValue: []});

  // products: Product[] = [];
  isLoading = true;

  // constructor(private ProductService: ProductService) {}

  // ngOnInit() {
  //   this.ProductService.getProducts().subscribe({
  //     next: (data) => {
  //       this.products = data;
  //       this.isLoading = false
  //     },
  //     error: (error) => {
  //       console.log('Error karochi: ', error);
  //       this.isLoading = false
  //     }
  //   })
  // }
}
