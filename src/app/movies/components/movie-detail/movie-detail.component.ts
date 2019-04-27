import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Movie } from "src/app/shared/models/movie.model";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-movie-detail",
  templateUrl: "./movie-detail.component.html",
  styleUrls: ["./movie-detail.component.css"]
})
export class MovieDetailComponent {
  originalMovie: Movie | undefined;
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();

  movieForm = new FormGroup({
    name: new FormControl(""),
    earnings: new FormControl(0),
    description: new FormControl("")
  });

  @Input() set movie(movie: Movie) {
    this.movieForm.reset();
    this.originalMovie = null;

    if (movie) {
      this.movieForm.setValue({
        name: movie.name,
        earnings: movie.earnings,
        description: movie.description
      });

      this.originalMovie = movie;
    }
  }

  onSubmit(movie: Movie) {
    this.save.emit({ ...this.originalMovie, ...movie });
  }
}
