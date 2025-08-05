import { Component, computed, effect, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CartService } from '../../services/cart/cart.service';
import { ICart } from '../../models/cart';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductCard } from '../../components/product-card/product-card';
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
  private cartSignal = signal<ICart[]>([]);

  cart = this.cartSignal.asReadonly();

  totalPrice = computed(() => {
    return this.cart().reduce((total, item) => total + item.product.price * item.quantity, 0);
  });

  constructor() {
    this.loadCart();
  }
  private loadCart() {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cartSignal.set(cart);
      }
    })
  }

  private updateQuantity(cartId: string, quantity: number) {
    this.cartService.updateQuantity(cartId, quantity).subscribe({
      next: (updatedCart) => this.cartSignal.update(current => current.map(item => item.id === cartId ? { ...item, quantity: updatedCart.quantity } : item))
    });
  }

  increaseQuantity(cartId: string, quantity: number) {
    this.updateQuantity(cartId, quantity + 1);
  }
  decreaseQuantity(cartId: string, quantity: number) {
    this.updateQuantity(cartId, quantity - 1);
    if (quantity === 1) {
      this.remove(cartId)
    }
  }

  // remove(cartId: string) {
  //   this.cartService.removeFromCart(cartId).subscribe({
  //     next: () => this.cartSignal.update(current => current.filter(item => item.id !== cartId))
  //   })
  // }
  remove(cartId: string) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        this.cartSignal.update(current =>
          current.filter(item => item.id !== cartId)
        );
      }
    });
  }

  clearCart() {
    this.cartSignal().forEach((cart) => {
      this.cartService.removeFromCart(cart.id).subscribe()
    })
    this.cartSignal.set([]);
  }
}