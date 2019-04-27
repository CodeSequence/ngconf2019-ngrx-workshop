import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BooksTotalComponent } from "./books-total.component";
import { MaterialModule } from "src/app/material.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("BooksTotalComponent", () => {
  let component: BooksTotalComponent;
  let fixture: ComponentFixture<BooksTotalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [BooksTotalComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
