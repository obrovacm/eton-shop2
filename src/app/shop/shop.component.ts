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
  ) { }

  ngOnInit() {
    // Da li je stavljanje 'loading'-a u servis losa praksa i zasto?
    this.loading = this.shopItemsService.getLoadingState();
    this.loadingSubscription = this.shopItemsService.loadingChanged.subscribe(
      (loadingState: boolean) => {
        this.loading = loadingState;
      }
    )
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

  onAddToCard(item: ShopItem) {
    this.cartService.addToCart(item);
  }

  onEditItem(id: number) {
    this.router.navigate(["manage-items", "edit", id]);
  }

  ngOnDestroy() {
    this.shopItemsSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
