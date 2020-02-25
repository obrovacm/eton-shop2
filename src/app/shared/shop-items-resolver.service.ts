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
  constructor(private shopItemsService: ShopItemsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const shopItems: ShopItem[] = this.shopItemsService.getShopItems();

    console.log("RESOLVER active");
    // autopreloads only if shop items service array is empty
    if (shopItems.length === 0) {
      return this.shopItemsService.getItemsFromServer();
    } else {
      return shopItems;
    }
  }
}
