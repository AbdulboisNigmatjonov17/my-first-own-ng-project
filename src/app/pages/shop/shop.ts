import { Component, computed, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CartService } from '../../services/cart/cart.service';
import { ICart } from '../../models/cart';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../models/product';

@Component({
  selector: 'app-shop',
  imports: [Navbar, CommonModule, MatCardModule, NgOptimizedImage, MatButtonModule],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  private cartService = inject(CartService);
  cartSignal = signal<ICart[]>([]);
  cart = this.cartSignal.asReadonly();

  totalPrice = computed(() => {
    return this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  constructor() {
    this.loadCart();
  }


  private async loadCart() {
    const cart = await this.cartService.getCart();
    this.cartSignal.set(cart);
  }

  async increaseQuantity(cartId: number, quantity: number) {
    await this.cartService.updateQuantity(cartId, quantity + 1);
    this.loadCart();
  }

  async decreaseQuantity(cartId: number, quantity: number) {
    if (quantity === 1) {
      await this.remove(cartId);
    } else {
      await this.cartService.updateQuantity(cartId, quantity - 1);
      this.loadCart();
    }
  }

  async remove(cartId: number) {
    await this.cartService.removeFromCart(cartId);
    this.loadCart();
  }

  async clearCart() {
    await this.cartService.clearCart();
    this.cartSignal.set([]);
  }

}