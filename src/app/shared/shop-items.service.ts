import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { ShopItem } from "./shop-item.model";

@Injectable({
  providedIn: "root"
})
export class ShopItemsService {
  shopItemsChanged = new Subject<ShopItem[]>();
  private shopItems: ShopItem[] = [
    new ShopItem(
      "Fork",
      13,
      "Neki opis.",
      "https://all4desktop.com/data_images/original/4244685-fork.jpg"
    ),
    new ShopItem(
      "Old keys",
      12,
      "Neki opis 2.",
      "https://pro2-bar-s3-cdn-cf6.myportfolio.com/d862e19fa51175afcadf467d73f155b9/0344c31b5c17416217db3536_rw_3840.jpg?h=81801dfe0f1c469bfba2215ed5fb7fb2"
    )
  ];

  constructor() {}

  getItems() {
    return this.shopItems.slice();
  }
}
