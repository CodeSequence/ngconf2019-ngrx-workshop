import { Component, OnInit } from "@angular/core";

import { Book } from "src/app/shared/models/book.model";

import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromRoot from "src/app/shared/state";
import { BooksPageActions } from "../../actions";

@Component({
  selector: "app-books",
  templateUrl: "./books-page.component.html",
  styleUrls: ["./books-page.component.css"]
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;
  activeBook$: Observable<Book>;
  total$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.books$ = this.store.pipe(select(fromRoot.selectAllBooks));
    this.activeBook$ = this.store.pipe(select(fromRoot.selectActiveBook));
    this.total$ = this.store.pipe(select(fromRoot.selectBookEarningsTotals));
  }

  ngOnInit() {
    this.getBooks();
    this.removeSelectedBook();
  }

  getBooks() {
    this.store.dispatch(BooksPageActions.enter());
  }

  onSelect(book: Book) {
    this.store.dispatch(BooksPageActions.selectBook({ bookId: book.id }));
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
    this.store.dispatch(BooksPageActions.clearSelectedBook());
  }

  onSave(book: Book) {
    if (!book.id) {
      this.saveBook(book);
    } else {
      this.updateBook(book);
    }
  }

  saveBook(book: Book) {
    this.store.dispatch(BooksPageActions.createBook({ book }));
  }

  updateBook(book: Book) {
    this.store.dispatch(BooksPageActions.updateBook({ book, changes: book }));
  }

  onDelete(book: Book) {
    this.store.dispatch(BooksPageActions.deleteBook({ book }));
  }
}
