import { Component } from '@angular/core';
import { Product } from '../product.model';
import { productsArray } from '../products-data'
import {CartService} from '@shared/cart/cart.service';
import {ProductsService} from '@catalog/products.service';

@Component({
  selector: 'bot-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(private cartService: CartService,private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => this.products = products);
  }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  filter(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  }

  getFilteredProducts() {
    return this.searchTerm === ''
      ? this.products
      : this.products.filter(
        (product: Product) => product.name.toLowerCase().includes(this.searchTerm)
      );
  }
}
