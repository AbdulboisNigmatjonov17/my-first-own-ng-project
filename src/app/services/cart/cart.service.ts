import { SupabaseService } from './../supabase/supabase';
import { Injectable } from '@angular/core';
import { ICart } from '../../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private SupabaseService: SupabaseService) { }

  async getCart(): Promise<ICart[]> {
    const { data, error } = await this.SupabaseService.client
      .from('cart')
      .select(`
        id,
        quantity,
        product:products(*)
      `);

    if (error) {
      console.error('Error fetching cart:', error);
      return [];
    }

    return (data || []).map(item => ({
      id: item.id,
      quantity: item.quantity,
      product: Array.isArray(item.product) ? item.product[0] : item.product
    }));
  }


  // Savatga qo‘shish
  async addToCart(cart: Omit<ICart, 'id'>, productId: number): Promise<boolean> {
    const existingCart = await this.getCart();
    const existItem = existingCart.find(item => item.product.id === productId);

    if (!existItem) {
      await this.addCart(cart);
      return true;
    } else {
      await this.updateQuantity(existItem.id, existItem.quantity + 1);
      return false;
    }
  }

  // Yangi cart yozish
  async addCart(cart: Omit<ICart, 'id'>) {
    const { error } = await this.SupabaseService.client
      .from('cart')
      .insert([cart]);

    if (error) {
      console.error('Error adding cart:', error);
    }
  }

  // Cartdan o‘chirish
  async removeFromCart(cartId: number) {
    const { error } = await this.SupabaseService.client
      .from('cart')
      .delete()
      .eq('id', cartId);

    if (error) {
      console.error('Error removing from cart:', error);
    }
  }

  // Cartni tozalash
  async clearCart() {
    const { error } = await this.SupabaseService.client
      .from('cart')
      .delete()
      .neq('id', 0); // hamma cartlarni o‘chiradi

    if (error) {
      console.error('Error clearing cart:', error);
    }
  }

  // Quantity yangilash
  async updateQuantity(cartId: number, quantity: number) {
    const { error } = await this.SupabaseService.client
      .from('cart')
      .update({ quantity })
      .eq('id', cartId);

    if (error) {
      console.error('Error updating quantity:', error);
    }
  }
}
