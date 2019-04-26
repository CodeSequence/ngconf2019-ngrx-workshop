import { Book } from "src/app/shared/models/book.model";
import { createAction, props } from "@ngrx/store";

export const booksLoaded = createAction(
  "[Books API] Books Loaded Success",
  props<{ books: Book[] }>()
);

export const bookCreated = createAction(
  "[Books API] Book Created",
  props<{ book: Book }>()
);

export const bookUpdated = createAction(
  "[Books API] Book Updated",
  props<{ book: Book }>()
);

export const bookDeleted = createAction(
  "[Books API] Book Deleted",
  props<{ book: Book }>()
);

export type BooksApiActions = ReturnType<
  | typeof booksLoaded
  | typeof bookCreated
  | typeof bookUpdated
  | typeof bookDeleted
>;
