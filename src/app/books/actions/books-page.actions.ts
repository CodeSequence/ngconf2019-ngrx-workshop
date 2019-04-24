import { Book } from "src/app/shared/models/book.model";
import { Action } from "@ngrx/store";

export enum BooksActionTypes {
  Enter = "[Books Page] Enter",
  SelectBook = "[Books Page] Select Book",
  ClearSelectedBook = "[Books Page] Clear Selected Book",
  CreateBook = "[Books Page] Create Book",
  UpdateBook = "[Books Page] Update Book",
  DeleteBook = "[Books Page] Delete Book"
}

export class Enter implements Action {
  readonly type = BooksActionTypes.Enter;
}

export class SelectBook implements Action {
  readonly type = BooksActionTypes.SelectBook;

  constructor(public bookId: string) {}
}

export class ClearSelectedBook implements Action {
  readonly type = BooksActionTypes.ClearSelectedBook;
}

export class CreateBook implements Action {
  readonly type = BooksActionTypes.CreateBook;

  constructor(public book: Book) {}
}

export class UpdateBook implements Action {
  readonly type = BooksActionTypes.UpdateBook;

  constructor(public book: Book) {}
}

export class DeleteBook implements Action {
  readonly type = BooksActionTypes.DeleteBook;

  constructor(public book: Book) {}
}

export type BooksActions =
  | Enter
  | SelectBook
  | ClearSelectedBook
  | CreateBook
  | UpdateBook
  | DeleteBook;
