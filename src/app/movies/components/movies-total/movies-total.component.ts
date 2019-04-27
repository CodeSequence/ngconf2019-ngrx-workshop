import { Component, Input } from "@angular/core";

@Component({
  selector: "app-movies-total",
  templateUrl: "./movies-total.component.html",
  styleUrls: ["./movies-total.component.css"]
})
export class MoviesTotalComponent {
  @Input() total: number;
}
