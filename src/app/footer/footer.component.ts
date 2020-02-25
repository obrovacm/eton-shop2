import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-footer",
  template: `
    <footer>
      <p>
        created by
        <a href="https://milos.netlify.com" target="_blank">@milos_dev</a>
      </p>
    </footer>
  `,
  styleUrls: ["./footer.component.scss"]
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
