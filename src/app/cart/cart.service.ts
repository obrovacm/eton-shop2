import { Injectable } from "@angular/core";
import { ShopItem } from "../shared/shop-item.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CartService {
  cartChanged = new Subject<ShopItem[]>();
  cartItems: ShopItem[] = [];

  constructor() {}

  addToCart(item: ShopItem) {
    this.cartItems.push(item);
    this.cartChanged.next(this.cartItems.slice());
  }
  getCartItems() {
    return this.cartItems.slice();
  }

  // increment item
  // decrement
  // remove item from cart
}
