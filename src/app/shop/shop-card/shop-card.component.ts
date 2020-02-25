import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

import { faCartPlus, faCog } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "src/app/cart/cart.service";
import { ShopItem } from "src/app/shared/shop-item.model";

@Component({
  selector: "app-shop-card",
  templateUrl: "./shop-card.component.html",
  styleUrls: ["./shop-card.component.scss"]
})
export class ShopCardComponent {
  @Input() item: ShopItem;
  faCartPlus = faCartPlus;
  faCog = faCog;

  constructor(private cartService: CartService, private router: Router) {}

  onAddToCard() {
    this.cartService.addToCart(this.item);
  }

  onEditItem() {
    this.router.navigate(["manage-items", "edit", this.item.id]);
  }
}
