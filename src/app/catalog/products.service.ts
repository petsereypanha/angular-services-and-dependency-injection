import { Injectable } from '@angular/core';
import {Product} from '@shared/product.model';
import {productsArray} from '@catalog/products-data';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts(): Product[] {
    return productsArray;
  }
}
