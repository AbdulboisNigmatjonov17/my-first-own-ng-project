import { Component, inject, signal } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductCard } from "../product-card/product-card";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductCard, CommonModule, MatProgressSpinnerModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products {
  private productService = inject(ProductService);

  // Signal orqali productlar
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  trackById(index: number, item: Product) {
    return item.id;
  }
}
