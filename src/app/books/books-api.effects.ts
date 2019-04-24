import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { BooksPageActions, BooksApiActions } from "./actions";
import { BooksService } from "../shared/services/book.service";
import { mergeMap, map, catchError } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Injectable()
export class BooksApiEffects {
  @Effect()
  loadBooks$ = this.actions$.pipe(
    ofType(BooksPageActions.BooksActionTypes.Enter),
    mergeMap(() =>
      this.booksService.all().pipe(
        map(books => new BooksApiActions.BooksLoaded(books)),
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
