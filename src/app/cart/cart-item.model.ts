import { ShopItem } from "../shared/shop-item.model";

export class CartItem {
  public title: string;
  public price: number;
  public description: string;
  public image: string;
  public id: number;
  public counter: number;
  constructor(shopItem: ShopItem) {
    this.title = shopItem.title;
    this.price = shopItem.price;
    this.description = shopItem.description;
    this.image = shopItem.image;
    this.id = shopItem.id;
    this.counter = 1;
  }
}
