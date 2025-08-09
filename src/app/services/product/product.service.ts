import { SupabaseService } from './../supabase/supabase';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private supabaseService: SupabaseService) { }

  // Observable qaytaradi
  getProducts(): Observable<Product[]> {
    return from(
      this.supabaseService.client
        .from('products')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            console.error(error);
            return [];
          }
          return data || [];
        })
    );
  }

  // addProduct(product: Product): Observable<void> {
  //   return from(
  //     this.supabaseService.client
  //       .from<Product>('products')
  //       .insert([product])
  //       .then(({ error }) => {
  //         if (error) {
  //           console.error('Error adding product:', error);
  //         }
  //       })
  //   );
  // }
  addProduct(product: Product): Observable<void> {
    return from(
      this.supabaseService.client
        .from('products')
        .insert([product])
        .then(({ error }) => {
          if (error) {
            console.error('Error adding product:', error);
          }
        })
    );
  }

}
