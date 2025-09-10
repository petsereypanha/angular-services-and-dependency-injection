import {computed, Injectable, InjectionToken, signal} from '@angular/core';
import {Product} from '@shared/product.model';

type CartOption = {
  persistenceType: string,
  persistenceKey: string
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<Product[]>([]);
  private cartOptions: CartOption = {
    persistenceType: 'localStorage',
    persistenceKey: 'cart'
  }

  constructor(
  ) {
    if(this.cartOptions && this.cartOptions.persistenceType === 'local' ){
      const cartString = localStorage.getItem(this.cartOptions.persistenceKey);
      const cart: Product[] = cartString ? JSON.parse(cartString) as Product[] : [];
      this.cartItems.set(cart);
    }
  }

  get cart() {
    return this.cartItems.asReadonly();
  }

  add(product: Product) {
    this.cartItems.update(cart => [...cart, product]);
    this.storeCart();
  }

  remove(product: Product) {
    this.cartItems.update((cart) => cart.filter(p => p !== product));
    this.storeCart();
  }

  private storeCart() {
    if(this.cartOptions && this.cartOptions.persistenceType === 'local' ){
       localStorage.setItem(this.cartOptions.persistenceKey, JSON.stringify(this.cartItems()));
    }
  }
  get cartTotal() {
    return computed(() => this.cartItems().reduce((prev, next) => {
      let discount = next.discount && next.discount > 0 ? 1 - next.discount : 1;
      return prev + next.price * discount;
    }, 0));
  }

}
