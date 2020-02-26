import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ShopItemsService } from "../shared/shop-items.service";
import { ShopItem } from "../shared/shop-item.model";
import { ActivatedRoute } from "@angular/router";

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

  constructor(
    private shopItemsService: ShopItemsService,
    private route: ActivatedRoute
  ) {}

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
    // // ngOnInit listens for changes in service, while resolver checks
    // // if the shopItems array in service is empty. If it is, resolver
    // // sends GET HTTP request that changes service state, so our
    // // 'this.shopItemsSubscription' is called and page content is updated
    // // -------------------------------------------------
    // // Alternatively, resolver's return value could be reached, but
    // // that would be superfluous since we're already observing changes in
    // // service and updating local state based on it. Furthermore, if we
    // // stopped observing these changes and relied solely on resolver's
    // // return value, we would introduce some bugs. For example, changes
    // // that came from server would not be tracked since redirection works
    // // faster than server can respond and change the value in service, which
    // // will be forwarded to local state.
    // this.route.data.subscribe(data => {
    //   console.log("Resolver's return value:", data.shopItems);
    // });
  }

  ngOnDestroy() {
    this.shopItemsSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
