import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Shop } from './pages/shop/shop';
import { ProductsPage } from './pages/products/products';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // ROOT path yo‘naltiradi
    { path: 'home', component: Home },
    { path: 'shop', component: Shop },
    {path: 'products', component: ProductsPage}
];

