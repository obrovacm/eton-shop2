import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // header ce morati da menja dostupnost cart dugmeta u
  // zavisno od sadrzaja + brojac
  // a new item ce se menjati u 'Edit item' ako se postojeci menja
  // mogao bi i refresh za novi GET od servera
}
