import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { CartService } from "../cart/cart.service";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { CartItem } from "../cart/cart-item.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;

  onCartPage = false;
  editMode = false;
  cartCounter = 0;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("edit") && !this.editMode) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
        // console.log("event", this.editMode);
        // kako da ovo ne pozivam ovako cesto?
        if (event.url.includes("cart") && !this.onCartPage) {
          this.onCartPage = true;
        } else {
          this.onCartPage = false;
        }
      }
    });

    this.cartService.cartChanged.subscribe(cartItems => {
      this.cartCounter = cartItems.reduce(
        (total, item: CartItem) => (total += item.counter),
        0
      );
    });
  }
}
