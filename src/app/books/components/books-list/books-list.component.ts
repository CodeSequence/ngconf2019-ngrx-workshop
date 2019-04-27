import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Book } from "src/app/shared/models/book.model";

@Component({
  selector: "app-books-list",
  templateUrl: "./books-list.component.html",
  styleUrls: ["./books-list.component.css"]
})
export class BooksListComponent {
  @Input() books: Book[];
  @Input() readonly = false;
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
}
