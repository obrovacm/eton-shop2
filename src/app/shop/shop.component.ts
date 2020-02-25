import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ShopItemsService } from "../shared/shop-items.service";
import { ShopItem } from "../shared/shop-item.model";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"]
})
export class ShopComponent implements OnInit, OnDestroy {
  shopItemsSubscription: Subscription;
  shopItems: ShopItem[];
  loadingSubscription: Subscription;
  loading = false;

  constructor(private shopItemsService: ShopItemsService) {}

  ngOnInit() {
    // Da li je stavljanje 'loading'-a u servis losa praksa i zasto?
    this.loading = this.shopItemsService.getLoadingState();
    this.loadingSubscription = this.shopItemsService.loadingChanged.subscribe(
      (loadingState: boolean) => {
        this.loading = loadingState;
      }
    );
    // getting initial array and then subscribing to changes
    this.shopItems = this.shopItemsService.getShopItems();
    this.shopItemsSubscription = this.shopItemsService.shopItemsServiceChanged.subscribe(
      (shopItems: ShopItem[]) => {
        this.shopItems = shopItems;
      },
      err => {
        console.log(err);
      }
    );
    // ngOnInit listens for changes in service 'shop-items-resolver.service.ts'
    // is checking if the shopItems array in service is emptyand if it is, it
    // sends GET HTTP request that changes service state, so our
    // 'this.shopItemsSubscription' is called and page content is updated
  }

  ngOnDestroy() {
    this.shopItemsSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
