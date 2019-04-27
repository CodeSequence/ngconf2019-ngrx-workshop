import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

import { MaterialModule } from "./material.module";
import { MoviesModule } from "./movies/movies.module";

import { AppComponent } from "./app.component";

import { reducers, metaReducers } from "./shared/state";
import { BooksModule } from "./books/books.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", pathMatch: "full", redirectTo: "/movies" }
    ]),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    MaterialModule,
    MoviesModule,
    BooksModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
