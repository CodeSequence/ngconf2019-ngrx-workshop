import { Book } from "src/app/shared/models/book.model";
import { Action } from "@ngrx/store";

export enum BooksApiActionTypes {
  BooksLoaded = "[Books API] Books Loaded Success",
  BookCreated = "[Books API] Book Created",
  BookUpdated = "[Books API] Book Updated",
  BookDeleted = "[Books API] Book Deleted"
}

export class BooksLoaded implements Action {
  readonly type = BooksApiActionTypes.BooksLoaded;

  constructor(public books: Book[]) {}
}

export class BookCreated implements Action {
  readonly type = BooksApiActionTypes.BookCreated;

  constructor(public book: Book) {}
}

export class BookUpdated implements Action {
  readonly type = BooksApiActionTypes.BookUpdated;

  constructor(public book: Book) {}
}

export class BookDeleted implements Action {
  readonly type = BooksApiActionTypes.BookDeleted;

  constructor(public book: Book) {}
}

export type BooksApiActions =
  | BooksLoaded
  | BookCreated
  | BookUpdated
  | BookDeleted;
