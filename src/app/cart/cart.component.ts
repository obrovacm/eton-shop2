import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShopItem } from "../shared/shop-item.model";
import { CartService } from "./cart.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  cartItems: ShopItem[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cartChanged.subscribe(
      (cartItems: ShopItem[]) => {
        this.cartItems = cartItems;
      }
    );
    this.cartItems = this.cartService.getCartItems();
  }

  // increment item
  // decrement
  // remove item from cart

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
}
