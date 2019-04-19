import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as uuid from "uuid/v4";
import { Book, BookRequiredProps } from "../models/book.model";

const BASE_URL = "http://localhost:3000/books";
const HEADER = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class BooksService {
  constructor(private http: HttpClient) {}

  all() {
    return this.http.get<Book[]>(BASE_URL);
  }

  load(id: string) {
    return this.http.get<Book>(`${BASE_URL}/${id}`);
  }

  create(bookProps: BookRequiredProps) {
    const Book: Book = {
      id: uuid(),
      ...bookProps
    };

    return this.http.post<Book>(`${BASE_URL}`, JSON.stringify(Book), HEADER);
  }

  update(id: string, updates: BookRequiredProps) {
    return this.http.patch<Book>(
      `${BASE_URL}/${id}`,
      JSON.stringify(updates),
      HEADER
    );
  }

  delete(id: string) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
