import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError, Subject } from "rxjs";
import { ShopItem } from "./shop-item.model";

@Injectable()
export class ShopItemsService {
  shopItemsServiceChanged = new Subject<ShopItem[]>();
  shopItems: ShopItem[] = [];

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

  //////////////////////////////////////////////////////////////////

  setShopItems(shopItems: ShopItem[]) {
    this.shopItems = shopItems;
  }

  getShopItems() {
    return this.shopItems.slice();
  }

  getItemsFromServer() {
    // this is called from 'shop-items-resolver.service.ts'
    return this.get();
  }

  addShopItem(item: ShopItem): Observable<ShopItem> {
    return this.post(item);
  }

  updateItem(item: ShopItem) {
    return this.put(item);
  }

  deleteShopItem(id: number) {
    return this.delete(id);
  }
}
