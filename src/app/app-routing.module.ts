import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShopComponent } from "./shop/shop.component";
import { CartComponent } from "./cart/cart.component";
import { ManageItemsComponent } from "./manage-items-base/manage-items/manage-items.component";
import { NotFoundComponent } from "./shared/not-found.component";
import { ManageItemsBaseComponent } from "./manage-items-base/manage-items-base.component";
import { ShopItemsResolverService } from "./shared/shop-items-resolver.service";

const routes: Routes = [
  { path: "", redirectTo: "/shop", pathMatch: "full" },
  {
    path: "shop",
    component: ShopComponent,
    resolve: [ShopItemsResolverService]
  },
  { path: "manage-items", redirectTo: "/manage-items/new", pathMatch: "full" },
  {
    path: "manage-items",
    component: ManageItemsBaseComponent,
    children: [
      {
        path: "new",
        component: ManageItemsComponent
      },
      {
        path: "edit/:id",
        component: ManageItemsComponent
      }
    ]
  },
  { path: "cart", component: CartComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "/404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
