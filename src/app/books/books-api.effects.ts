import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { BooksPageActions, BooksApiActions } from "./actions";
import { BooksService } from "../shared/services/book.service";
import {
  mergeMap,
  map,
  catchError,
  exhaustMap,
  concatMap
} from "rxjs/operators";
import { EMPTY } from "rxjs";

@Injectable()
export class BooksApiEffects {
  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(BooksPageActions.enter.type),
    exhaustMap(() =>
      this.booksService.all().pipe(
        map(books => BooksApiActions.booksLoaded({ books })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  createBook$ = this.actions$.pipe(
    ofType(BooksPageActions.createBook.type),
    mergeMap(action =>
      this.booksService.create(action.book).pipe(
        map(book => BooksApiActions.bookCreated({ book })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  updateBook$ = this.actions$.pipe(
    ofType(BooksPageActions.updateBook.type),
    concatMap(action =>
      this.booksService.update(action.book.id, action.book).pipe(
        map(book => BooksApiActions.bookUpdated({ book })),
        catchError(() => EMPTY)
      )
    )
  );

  @Effect()
  deleteBook$ = this.actions$.pipe(
    ofType(BooksPageActions.deleteBook.type),
    mergeMap(action =>
      this.booksService.delete(action.book.id).pipe(
        map(() => BooksApiActions.bookDeleted({ book: action.book })),
        catchError(() => EMPTY)
      )
    )
  );

  constructor(
    private booksService: BooksService,
    private actions$: Actions<
      BooksPageActions.BooksActions | BooksApiActions.BooksApiActions
    >
  ) {}
}
