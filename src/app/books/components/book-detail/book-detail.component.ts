import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Book } from "src/app/shared/models/book.model";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"]
})
export class BookDetailComponent {
  originalBook: Book | undefined;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  bookForm = new FormGroup({
    name: new FormControl(""),
    earnings: new FormControl(0),
    description: new FormControl("")
  });

  @Input() set book(book: Book) {
    this.bookForm.reset();
    this.originalBook = null;

    if (book) {
      this.bookForm.setValue({
        name: book.name,
        earnings: book.earnings,
        description: book.description
      });

      this.originalBook = book;
    }
  }

  onSubmit(book: Book) {
    this.save.emit({ ...this.originalBook, ...book });
  }
}
