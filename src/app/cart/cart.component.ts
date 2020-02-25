import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import {
  faWindowClose,
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-solid-svg-icons";

import { CartService } from "./cart.service";
import { CartItem } from "./cart-item.model";

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
  loading = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.toastr.success("", "Successful shopping!");
      this.cartService.emptyCart();
      this.router.navigate(["/shop"]);
    }, 2500);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
