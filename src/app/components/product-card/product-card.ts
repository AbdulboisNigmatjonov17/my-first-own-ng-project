import { Component, inject, Input, Pipe } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatIconModule, CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  standalone: true
})
export class ProductCard {
  @Input() product!: Product;
  private cartService = inject(CartService);

  async onSubmit(product: Product) {
    const cartItem = { product, quantity: 1 };
    try {
      await this.cartService.addToCart(cartItem, product.id);
      console.log('Product added to cart', product.id);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  }
  
}
