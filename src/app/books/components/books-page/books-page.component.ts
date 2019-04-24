import { Component, OnInit } from "@angular/core";

import { Book } from "src/app/shared/models/book.model";

import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "src/app/shared/state";
import { map } from "rxjs/operators";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;
  currentBook: Book;
  total: number;

  constructor(private store: Store<fromRoot.State>) {
    this.books$ = this.store.pipe(
      select(state => state.books),
      map(booksState => booksState.books)
    );
  }

  ngOnInit() {
    this.getBooks();
    this.removeSelectedBook();
  }

  getBooks() {
    // Pending
  }

  updateTotals(books: Book[]) {
    this.total = books.reduce((total, book) => {
      return total + parseInt(`${book.earnings}`, 10) || 0;
    }, 0);
  }

  onSelect(book: Book) {
    this.store.dispatch({ type: "select", bookId: book.id });
    this.currentBook = book;
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch({ type: "clear select" });
    this.currentBook = null;
  }

  onSave(book: Book) {
    if (!book.id) {
      this.saveBook(book);
    } else {
      this.updateBook(book);
    }
  }

  saveBook(book: Book) {
    this.store.dispatch({ type: "create", book });
  }

  updateBook(book: Book) {
    this.store.dispatch({ type: "update", book });
  }

  onDelete(book: Book) {
    this.store.dispatch({ type: "delete", book });
  }
}
