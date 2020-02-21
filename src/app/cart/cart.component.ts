import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "./cart.service";
import { Subscription } from "rxjs";
import { CartItem } from "./cart-item.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cartChanged.subscribe(
      (cartItems: CartItem[]) => {
        this.cartItems = cartItems;
      }
    );
    this.cartItems = this.cartService.getCartItems();
  }

  totalPrice() {
    return this.cartItems.reduce(
      (total, item) => (total += item.price * item.counter),
      0
    );
  }

  increment(i: number) {
    this.cartService.increment(i);
  }

  decrement(i: number) {
    this.cartService.decrement(i);
  }

  remove(i: number) {
    this.cartService.removeFromCart(i);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
