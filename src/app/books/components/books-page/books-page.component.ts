import { Component, OnInit } from "@angular/core";

import { Book } from "src/app/shared/models/book.model";
import { BooksService } from "src/app/shared/services/book.service";

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
  books: Book[];
  currentBook: Book;
  total: number;

  constructor(
    private booksService: BooksService,
    private store: Store<fromRoot.State>
  ) {
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
    this.booksService.all().subscribe(books => {
      this.books = books;
      this.updateTotals(books);
    });
  }

  updateTotals(books: Book[]) {
    this.total = books.reduce((total, book) => {
      return total + parseInt(`${book.earnings}`, 10) || 0;
    }, 0);
  }

  onSelect(book: Book) {
    this.currentBook = book;
  }

  onCancel() {
    this.removeSelectedBook();
  }

  removeSelectedBook() {
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
    this.booksService.create(book).subscribe(() => {
      this.getBooks();
      this.removeSelectedBook();
    });
  }

  updateBook(book: Book) {
    this.booksService.update(book.id, book).subscribe(() => {
      this.getBooks();
      this.removeSelectedBook();
    });
  }

  onDelete(book: Book) {
    this.booksService.delete(book.id).subscribe(() => {
      this.getBooks();
      this.removeSelectedBook();
    });
  }
}
