import { Component } from '@angular/core';
import { Products } from '../../components/products/products';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-products-page',
  imports: [Products, Navbar],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class ProductsPage {

}
