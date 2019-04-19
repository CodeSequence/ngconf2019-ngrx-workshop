import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { MaterialModule } from 'src/app/material.module';

import { MoviesPageActions, MovieApiActions } from '../../actions';
import * as fromRoot from 'src/app/shared/state';
import { Movie } from 'src/app/shared/models/movie.model';

import { MoviesPageComponent } from './movies-page.component';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { MoviesTotalComponent } from '../movies-total/movies-total.component';

describe('Component: Movies Page', () => {
  let comp: MoviesPageComponent;
  let fixture: ComponentFixture<MoviesPageComponent>;
  let store: MockStore<{ movies: Movie[] }>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        MoviesPageComponent,
        MoviesListComponent,
        MovieDetailComponent,
        MoviesTotalComponent
      ],
      providers: [
        provideMockStore()
      ]
    });

    fixture = TestBed.createComponent(MoviesPageComponent);
    comp = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create an instance', () => {
    expect(comp).toBeTruthy();
  });

  it('should display an Enter action on init', () => {
    const action = MoviesPageActions.enter();

    comp.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an select action on a select event from the movie list', () => {
    const movie: Movie = { id: "1", name: 'Movie', earnings: 25 };
    const action = MoviesPageActions.selectMovie({ movieId: movie.id });

    fixture.debugElement.query(By.css('app-movies-list')).triggerEventHandler('select', movie);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an delete action on a delete event from the movie list', () => {
    const movie: Movie = { id: "1", name: 'Movie', earnings: 25 };
    const action = MoviesPageActions.deleteMovie({ movie });

    fixture.debugElement.query(By.css('app-movies-list')).triggerEventHandler('delete', movie);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an save action on a save event from the movie details', () => {
    const movie: Movie = { id: undefined, name: 'Movie', earnings: 25 };
    const action = MoviesPageActions.createMovie({ movie });

    fixture.debugElement.query(By.css('app-movie-detail')).triggerEventHandler('save', movie);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an update action on a delete event from the movie details', () => {
    const movie: Movie = { id: "1", name: 'Movie', earnings: 25 };
    const action = MoviesPageActions.updateMovie({ movie, changes: movie });

    fixture.debugElement.query(By.css('app-movie-detail')).triggerEventHandler('save', movie);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should dispatch an clear action on a cancel event from the movie details', () => {
    const action = MoviesPageActions.clearSelectedMovie();

    fixture.debugElement.query(By.css('app-movie-detail')).triggerEventHandler('cancel', null);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
