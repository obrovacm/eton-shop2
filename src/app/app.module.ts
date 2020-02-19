import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ShopComponent } from "./shop/shop.component";
import { CartComponent } from "./cart/cart.component";
import { ManageItemsComponent } from "./manage-items/manage-items.component";
import { NotFoundComponent } from "./shared/not-found.component";
import { ShopCardComponent } from './shop/shop-card/shop-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    CartComponent,
    ManageItemsComponent,
    NotFoundComponent,
    ShopCardComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
