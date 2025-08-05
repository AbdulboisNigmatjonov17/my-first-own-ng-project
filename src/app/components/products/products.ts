import { ProductService } from './../../services/product/product.service';

import { Component, inject, signal } from '@angular/core';
import { ProductCard } from "../product-card/product-card";
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  imports: [ProductCard, CommonModule, MatProgressSpinnerModule],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products {
  ProductService = inject(ProductService);
  products = toSignal(this.ProductService.getProducts(), { initialValue: [] })

  cartService = inject(CartService)

  addToCart(product: Product) {
    const cartItem = {
      product,
      quantity: 1
    }

    this.cartService.addToCart(cartItem, product.id).subscribe({
      next: (added) => console.log(added),
      error: (err) => console.log(err)
    })
  }
}
