import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { ShopItemsService } from "../shared/shop-items.service";
import { ShopItem } from "../shared/shop-item.model";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit {
  serviceSubscription: Subscription;
  shopItems: ShopItem[];

  constructor(private itemService: ShopItemsService) {}

  ngOnInit() {
    this.serviceSubscription = this.itemService.shopItemsChanged.subscribe(
      (shopItems: ShopItem[]) => {
        this.shopItems = this.shopItems;
      }
    );
    this.shopItems = this.itemService.getItems();

    console.log(this.itemService.getItems());
  }
  addToCard(item: ShopItem) {
    // add item to cart service
  }
}
