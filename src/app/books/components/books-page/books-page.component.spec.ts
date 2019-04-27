/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "src/app/material.module";

import { BooksPageComponent } from "./books-page.component";
import { BooksService } from "src/app/shared/services/book.service";
import { BooksListComponent } from "../books-list/books-list.component";
import { BookDetailComponent } from "../book-detail/book-detail.component";
import { BooksTotalComponent } from "../books-total/books-total.component";
import { provideMockStore } from "@ngrx/store/testing";

class BooksServiceStub {}

describe("Component: Books Page", () => {
  let comp: BooksPageComponent;
  let fixture: ComponentFixture<BooksPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, ReactiveFormsModule],
      declarations: [
        BooksPageComponent,
        BooksPageComponent,
        BooksListComponent,
        BookDetailComponent,
        BooksTotalComponent
      ],
      providers: [
        { provide: BooksService, useClass: BooksServiceStub },
        provideMockStore()
      ]
    });

    fixture = TestBed.createComponent(BooksPageComponent);
    comp = fixture.componentInstance;
  });

  it("should create an instance", () => {
    expect(comp).toBeTruthy();
  });
});
