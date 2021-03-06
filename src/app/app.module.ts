import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ngx-toastr";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { ShopComponent } from "./shop/shop.component";
import { CartComponent } from "./cart/cart.component";
import { ManageItemsBaseComponent } from "./manage-items-base/manage-items-base.component";
import { ManageItemsComponent } from "./manage-items-base/manage-items/manage-items.component";
import { NotFoundComponent } from "./shared/not-found.component";
import { ShopItemsService } from "./shared/shop-items.service";
import { LoadingAnimationComponent } from "./loading-animation/loading-animation.component";
import { ShopCardComponent } from "./shop/shop-card/shop-card.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ShopComponent,
    CartComponent,
    ManageItemsComponent,
    NotFoundComponent,
    LoadingAnimationComponent,
    ManageItemsBaseComponent,
    ShopCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-left",
      preventDuplicates: true
    })
  ],
  providers: [ShopItemsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
