import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, throwError, Subscription } from "rxjs";
import { ShopItem } from "./shop-item.model";

@Injectable()
export class ShopItemsService implements OnInit {
  // ovo mi treba da bih mogao odavde da saljem item-e na izmenu
  // u suprotnom bih morao da komplikujem i skarabudzim komunikaciju
  // izmedju 'manage-items' i 'shop' komponente bez servisa
  shopItemsServiceChanged: Subscription;
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

  ngOnInit() {
    // prebaciti INIT FETCH REQUEST & Subscription is 'shop.component'
    // this.loading = true;
    // this.get().subscribe((shopItems: ShopItem[]) => {
    //   this.shopItems = shopItems;
    //   this.loading = false;
    // });
  }
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

  getShopItems(): Observable<ShopItem[]> {
    return this.get();
  }

  addShopItem(item: ShopItem): Observable<ShopItem> {
    this.shopItems.push(item);
    return this.post(item);
  }
}
