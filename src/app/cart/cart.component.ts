import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "./cart.service";
import { Subscription } from "rxjs";
import {
  faWindowClose,
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";

import { CartItem } from "./cart-item.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, OnDestroy {
  faWindowClose = faWindowClose;
  faPlusSquare = faPlusSquare;
  faMinusSquare = faMinusSquare;

  cartSubscription: Subscription;
  cartItems: CartItem[] = [];

  constructor(private cartService: CartService, private router: Router) {}

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

  onBuy() {
    this.router.navigate(["/shop"]);
    this.cartService.emptyCart();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
