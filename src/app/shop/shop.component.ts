import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ShopItemsService } from "../shared/shop-items.service";
import { ShopItem } from "../shared/shop-item.model";
import { CartService } from "../cart/cart.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit, OnDestroy {
  serviceSubscription: Subscription;
  shopItems: ShopItem[];

  loading = false;

  constructor(
    private cartService: CartService,
    private shopItemsService: ShopItemsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.serviceSubscription = this.shopItemsService
      .getShopItems()
      .subscribe((shopItems: ShopItem[]) => {
        this.shopItems = shopItems;
        this.loading = false;
      });
  }

  onAddToCard(item: ShopItem) {
    this.cartService.addToCart(item);
  }

  onEditItem(item: ShopItem) {
    this.router.navigate(["manage-items", "edit", item.id]);
  }

  ngOnDestroy() {
    this.serviceSubscription.unsubscribe();
  }
}
