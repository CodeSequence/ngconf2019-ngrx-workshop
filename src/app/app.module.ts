import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./shared/state";
import { EffectsModule } from "@ngrx/effects";
import { MoviesModule } from "./movies/movies.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    MoviesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
