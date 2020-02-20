import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ShopComponent } from "./shop/shop.component";
import { CartComponent } from "./cart/cart.component";
import { ManageItemsComponent } from "./manage-items/manage-items.component";
import { NotFoundComponent } from "./shared/not-found.component";

const routes: Routes = [
  { path: "", redirectTo: "/shop", pathMatch: "full" },
  {
    path: "shop",
    component: ShopComponent
  },
  { path: "manage-items", redirectTo: "/manage-items/new", pathMatch: "full" },
  {
    path: "manage-items",
    component: ManageItemsComponent,
    children: [
      { path: "new", component: ManageItemsComponent },
      { path: "edit/:id", component: ManageItemsComponent }
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
