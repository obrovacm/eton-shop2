import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { ShopItem } from "./shop-item.model";
import { ShopItemsService } from "./shop-items.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ShopItemsResolverService implements Resolve<ShopItem[]> {
  constructor(private shopItemsService: ShopItemsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const shopItems = this.shopItemsService.getShopItems();

    // autopreloads only if there's no recipes
    if (shopItems.length === 0) {
      return this.shopItemsService.getShopItemsFromServer();
    } else {
      return shopItems;
    }
  }
}
