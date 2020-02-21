import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError, Subject } from "rxjs";
import { ShopItem } from "./shop-item.model";

@Injectable()
export class ShopItemsService {
  shopItemsServiceChanged = new Subject<ShopItem[]>();
  shopItems: ShopItem[] = [];
  loadingServiceChanged = new Subject<boolean>();
  loading = false;

  /*
   * base url
   */
  baseUrl =
    "https://my-json-server.typicode.com/brankostancevic/products/products";

  /**
   * Constructor
   */
  constructor(private http: HttpClient) {}

  /**
   * Get api request
   */
  private get<T>(): Observable<T> {
    return this.http.get<T>(this.baseUrl).pipe(catchError(this.handleError));
  }

  /**
   * Post api request
   */
  private post<T>(data): Observable<T> {
    return this.http
      .post<T>(this.baseUrl, data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Put api request
   */
  private put<T>(data): Observable<T> {
    return this.http
      .put<T>(this.baseUrl, data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Patch api request
   */
  private patch<T>(data): Observable<T> {
    return this.http
      .patch<T>(this.baseUrl, data)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete api request
   */
  private delete<T>(): Observable<T> {
    return this.http.delete<T>(this.baseUrl).pipe(catchError(this.handleError));
  }

  /**
   * Handle errors
   */
  private handleError = (error: HttpErrorResponse) => {
    return throwError(error);
  };

  //////////////////////////////////////////////////////////////////

  getShopItemsFromServer() {
    // this is called from 'shop-items-resolver.service.ts'
    this.loading = true;
    this.loadingServiceChanged.next(!!this.loading);
    this.get().subscribe((shopItems: ShopItem[]) => {
      this.shopItems = shopItems;
      this.shopItemsServiceChanged.next(this.shopItems.slice());
      this.loading = false;
      this.loadingServiceChanged.next(!!this.loading);
    });
  }

  getShopItems() {
    return this.shopItems.slice();
  }

  addShopItem(item: ShopItem): Observable<ShopItem> {
    this.shopItems.push(item);
    this.shopItemsServiceChanged.next(this.shopItems.slice());
    return this.post(item);
  }

  updateItem(id: number, item: ShopItem) {
    item.id = id;
    let itemIndex;
    this.shopItems.find((item, i) => {
      itemIndex = i;
      return item.id === id;
    });
    this.shopItems[itemIndex] = item;

    //// this way doesn't preserve location in the array
    // const arrWithoutItem = this.shopItems.filter(item => item.id !== id);
    // item.id = id;
    // console.log("arrWithoutItem:", arrWithoutItem);
    // console.log("updatedItem", item);
    // arrWithoutItem.push(item);
    // const newShopItems = arrWithoutItem;
    // this.shopItems = newShopItems;

    this.shopItemsServiceChanged.next(this.shopItems.slice());
    return this.patch(item);
  }

  deleteShopItem(id: number) {
    let itemIndex;
    this.shopItems.find((item, i) => {
      itemIndex = i;
      return item.id === id;
    });
    this.shopItems.splice(itemIndex, 1);
    this.shopItemsServiceChanged.next(this.shopItems.slice());

    // da li delete brise celu bazu?
    // pa moram patch request
    // ili saljem ceo niz - minus obrisan item?
    //
    // return this.put(item);
  }
}
