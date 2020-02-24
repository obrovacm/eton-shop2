import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { faCartPlus, faCog } from "@fortawesome/free-solid-svg-icons";

import { ShopItemsService } from "../shared/shop-items.service";
import { ShopItem } from "../shared/shop-item.model";
import { CartService } from "../cart/cart.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit, OnDestroy {
  faCartPlus = faCartPlus;
  faCog = faCog;

  shopItemsSubscription: Subscription;
  shopItems: ShopItem[];
  loadingSubscription: Subscription;
  loading = false;

  constructor(
    private cartService: CartService,
    private shopItemsService: ShopItemsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.shopItemsSubscription = this.shopItemsService.shopItemsServiceChanged.subscribe(
      (shopItems: ShopItem[]) => {
        this.shopItems = shopItems;
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
    this.shopItems = this.shopItemsService.getShopItems();
  }

  onAddToCard(item: ShopItem) {
    this.cartService.addToCart(item);
  }

  onEditItem(id: number) {
    this.router.navigate(["manage-items", "edit", id]);
  }

  ngOnDestroy() {
    this.shopItemsSubscription.unsubscribe();
  }
}
