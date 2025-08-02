import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Products } from '../../components/products/products';

@Component({
  selector: 'app-home',
  imports: [Navbar, Products],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
