import { Injectable } from "@angular/core";
import { ShopItem } from "../shared/shop-item.model";
import { Subject } from "rxjs";
import { CartItem } from "./cart-item.model";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cartChanged = new Subject<ShopItem[]>();
  cartItems: CartItem[] = [];

  constructor() {}

  addToCart(shopItem: ShopItem) {
    // locating an item in order to create object of type 'cart item'
    // which contains property 'counter'
    let cartItemIndex;
    let foundItem = this.cartItems.find((item, i) => {
      cartItemIndex = i;
      return item.id === shopItem.id;
    });
    if (foundItem) {
      this.cartItems[cartItemIndex].counter++;
      // counter is used so that there are no more than one
      // card for a single kind of item in a cart (no matter the quantity)
    } else {
      const newCartItem = new CartItem(shopItem);
      this.cartItems.push(newCartItem);
    }
    this.cartChanged.next(this.cartItems.slice());
  }

  getCartItems() {
    return this.cartItems.slice();
  }

  increment(i: number) {
    this.cartItems[i].counter++;
    this.cartChanged.next(this.cartItems.slice());
  }

  decrement(i: number) {
    this.cartItems[i].counter--;
    this.cartChanged.next(this.cartItems.slice());
  }

  removeFromCart(i: number) {
    this.cartItems.splice(i, 1);
    this.cartChanged.next(this.cartItems.slice());
  }

  emptyCart() {
    this.cartItems = [];
    this.cartChanged.next(this.cartItems.slice());
  }
}
