import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError, Subject } from "rxjs";
import { ShopItem } from "./shop-item.model";

@Injectable()
export class ShopItemsService {
  shopItemsServiceChanged = new Subject<ShopItem[]>();
  private shopItems: ShopItem[] = [];
  loadingChanged = new Subject<boolean>();
  private loading = false;

  /*
   * base url
   */
  baseUrl =
    "https://my-json-server.typicode.com/brankostancevic/products/products";

  /**
   * Constructor
   */
  constructor(private http: HttpClient) { }

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
      .put<T>(`${this.baseUrl}/${data.id}`, data)
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
  private delete<T>(id: number): Observable<T> {
    return this.http
      .delete<T>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle errors
   */
  private handleError = (error: HttpErrorResponse) => {
    return throwError(error);
  };

  ////////////////////////////////////////////////////////////
  // SERVICING SERVER STATE aka HTTP REQUEST handles
  ////////////////////////////////////////////////////////////
  getItemsFromServer() {
    // this is called from 'shop-items-resolver.service.ts'
    this.loadingOn();
    let newShopItems;
    this.get().subscribe((items: ShopItem[]) => {
      newShopItems = items;
      this.setShopItems(newShopItems);
      this.loadingOff();
    }, err => {
      console.log(err);
      this.loadingOff();

    });
    // sta radi ovo u rezolveru? zasto resolver ima return? 
    // sta ce mu 'newShopItems'?
    return newShopItems
  }
  addShopItemToServer(item: ShopItem): Observable<ShopItem> {
    return this.post(item);
  }
  updateItemOnServer(item: ShopItem) {
    return this.put(item);
  }
  deleteShopItemOnServer(id: number) {
    return this.delete(id);
  }
  ////////////////////////////////////////////////////////////
  // SERVICING LOCAL STATE
  ////////////////////////////////////////////////////////////
  getShopItems() {
    return this.shopItems.slice();
  }

  setShopItems(items: ShopItem[]) {
    this.shopItems = items;
    this.shopItemsServiceChanged.next(
      this.shopItems.slice()
    )
  }

  addShopItem(item: ShopItem) {
    this.shopItems.push(item);
    this.shopItemsServiceChanged.next(
      this.shopItems.slice()
    )
  }

  editShopItem(item: ShopItem) {
    let itemIndex;
    this.shopItems.find((shopItem, i) => {
      itemIndex = i;
      return item.id === shopItem.id;
    });
    this.shopItems[itemIndex] = item;
    this.shopItemsServiceChanged.next(
      this.shopItems.slice()
    );
  }

  deleteShopItem(id: number) {
    let itemIndex;
    this.shopItems.find((shopItem, i) => {
      itemIndex = i;
      return id === shopItem.id;
    });
    this.shopItems.splice(itemIndex, 1);
    this.shopItemsServiceChanged.next(
      this.shopItems.slice()
    );
  }
  ////////////////////////////////////////////////////////////
  // LOADING STATE
  ////////////////////////////////////////////////////////////
  getLoadingState() {
    return this.loading;
  }
  loadingOn() {
    this.loading = true;
    this.loadingChanged.next(!!this.loading);
  }
  loadingOff() {
    this.loading = false;
    this.loadingChanged.next(!!this.loading);
  }
  // This way I can indicate background activity of service
  // in any component (with a spinner or a color change)
}
