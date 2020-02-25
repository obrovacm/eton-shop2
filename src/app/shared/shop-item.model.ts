export class ShopItem {
  public title: string;
  public price: number;
  public description: string;
  public image: string;
  public id?: number;
  constructor(
    title: string,
    price: number,
    description: string,
    image: string
  ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.image = image;
    // id is useful here for new items that won't get
    this.id = Math.floor(Math.random() * 100000);
  }
}
