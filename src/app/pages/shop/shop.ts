import { Component, effect, inject, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CartService } from '../../services/cart/cart.service';
import { ICart } from '../../models/cart';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-shop',
  imports: [Navbar, CommonModule, ProductCard],
  templateUrl: './shop.html',
  styleUrl: './shop.css'
})
export class Shop {
  private cartService = inject(CartService);

  cart = toSignal(this.cartService.getCart(), { initialValue: [] as ICart[] });
}
