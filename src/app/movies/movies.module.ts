import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { MovieApiEffects } from "./movie-api.effects";

@NgModule({ imports: [EffectsModule.forFeature([MovieApiEffects])] })
export class MoviesModule {}
