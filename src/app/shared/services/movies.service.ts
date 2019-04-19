import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as uuid from "uuid/v4";
import { Movie, MovieRequiredProps } from "../models/movie.model";

const BASE_URL = "http://localhost:3000/movies";
const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Movie[]>(BASE_URL);
  }

  load(id: string) {
    return this.http.get<Movie>(`${BASE_URL}/${id}`);
  }

  create(movieProps: MovieRequiredProps) {
    const movie: Movie = {
      id: uuid(),
      ...movieProps
    };

    return this.http.post<Movie>(`${BASE_URL}`, JSON.stringify(movie), HEADER);
  }

  update(id: string, updates: MovieRequiredProps) {
    return this.http.patch<Movie>(
      `${BASE_URL}/${id}`,
      JSON.stringify(updates),
      HEADER
    );
  }

  delete(id: string) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
