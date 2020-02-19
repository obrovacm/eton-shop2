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
    console.log(this.itemService.getItems());
  }
}
