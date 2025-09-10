import {Component, Inject, OnInit} from '@angular/core';
import { Product } from './product.model';
import {ProductsService} from '@catalog/products.service';
import { CartService} from '@shared/cart/cart.service';
import {Observable} from 'rxjs';
import {EngineersService} from '../squad/engineers.service';

@Component({
  selector: 'bot-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  products: Observable<Product[]> = this.productsService.getProducts();

  constructor(private productsService: ProductsService, private cartService: CartService, private engineersService: EngineersService) { }

  addToCart(product: Product) {
    this.cartService.add(product);
  }
}
