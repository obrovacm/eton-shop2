import { Component, OnInit } from "@angular/core";

import { ShopItemsService } from "../shared/shop-items.service";
import { ShopItem } from "../shared/shop-item.model";

@Component({
  selector: "app-manage-items",
  templateUrl: "./manage-items.component.html",
  styleUrls: ["./manage-items.component.scss"]
})
export class ManageItemsComponent implements OnInit {
  editMode: false; //should change nav-link ? "new item" : "edit item"

  constructor(private shopItemsService: ShopItemsService) {}

  ngOnInit() {}

  addBlankProduct() {
    this.shopItemsService
      .addShopItem(
        new ShopItem(
          "The blank product",
          77,
          "Lorem ipsumarum.",
          "data:image/png;base64,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"
        )
      )
      .subscribe(
        (shopItem: ShopItem) => {
          // this.shopItems.push(shopItem);
        },
        error => {}
      )
      .unsubscribe();
  }
}
