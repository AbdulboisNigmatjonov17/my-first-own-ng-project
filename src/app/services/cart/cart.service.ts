import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/product';
import { map, mergeMap, Observable } from 'rxjs';
import { ICart } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  // getCart(): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${this.apiUrl}/cart`)
  // }

  getCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.apiUrl}/cart`)
  }
  addToCart(cart: Omit<ICart, 'id'>, productId: string): Observable<boolean> {
    return this.getCart().pipe(
      mergeMap((carts) => {
        const existCart = carts.find((item) => item.product.id === productId)

        if (!existCart) {
          return this.addCart(cart).pipe(
            map(() => true)
          )
        } else {
          return this.updateCart(existCart.id, existCart.quantity + 1).pipe(
            map(() => false)
          )
        }
      })
    )
  }

  addCart(cart: Omit<ICart, 'id'>): Observable<ICart> {
    return this.http.post<ICart>(`${this.apiUrl}/cart`, cart)
  }

  removeFromCart(cartId: Product): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${cartId}`)
  }

  clearCart() {
    return this.http.delete(`${this.apiUrl}/cart`)
  }

  updateCart(cartId: string, quantity: number): Observable<ICart> {
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartId}`, { quantity })
  }
}
