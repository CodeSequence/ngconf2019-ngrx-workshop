import { Book } from "src/app/shared/models/book.model";
import { Action } from "@ngrx/store";

export enum BooksApiActionTypes {
  BooksLoaded = '[Books API] Books Loaded Success',
}

export class BooksLoaded implements Action {
  readonly type = BooksApiActionTypes.BooksLoaded;

  constructor(public books: Book[]) {}
}

export type BooksApiActions = 
  | BooksLoaded;
