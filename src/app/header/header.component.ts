import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
// import { Subscription } from "rxjs";
import { CartService } from "../cart/cart.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  // editModeSubscription: Subscription;
  onCartPage = false;
  editMode = false;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes("edit") && !this.editMode) {
          this.editMode = true;
        } else if (this.editMode) {
          this.editMode = false;
        }
        // console.log("event", this.editMode);
        // kako da ovo ne pozivam ovako cesto?
        if (event.url.includes("cart") && !this.onCartPage) {
          this.onCartPage = true;
        } else if (this.onCartPage) {
          this.onCartPage = false;
        }
      }
    });
    this.cartService.cartChanged.subscribe();
  }

  // header ce morati da menja dostupnost cart dugmeta u
  // zavisno od sadrzaja + brojac
  // mogao bi i refresh za novi GET od servera
  ngOnDestroy() {
    // this.editModeSubscription.unsubscribe();
  }
}
