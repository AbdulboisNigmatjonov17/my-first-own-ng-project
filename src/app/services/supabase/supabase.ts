import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = 'https://wsukclyryuyqjqjuhpyo.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzdWtjbHlyeXV5cWpxanVocHlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2MzIxOTQsImV4cCI6MjA3MDIwODE5NH0.m0XEMPmvDYw_Bjt7t4s0wok1vAFOV5xWcp0ozGZvohc';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  get client() {
    return this.supabase;
  }

  // // Auth misoli
  // async signUp(email: string, password: string) {
  //   return await this.supabase.auth.signUp({ email, password });
  // }

  // // Table’ga data qo‘shish
  // async insertProduct(product: { title: string; price: number }) {
  //   return await this.supabase.from('products').insert([product]);
  // }

  // // Table’dan data olish
  // async getProducts() {
  //   return await this.supabase.from('products').select('*');
  // }

  // // Storage’ga rasm yuklash
  // async uploadImage(file: File) {
  //   return await this.supabase.storage
  //     .from('images')
  //     .upload(`public/${file.name}`, file);
  // }
}
