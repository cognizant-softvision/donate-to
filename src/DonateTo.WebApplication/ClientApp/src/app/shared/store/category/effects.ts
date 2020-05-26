import { loadCategories, loadCategoriesFailed, loadCategoriesSuccess } from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CategoryService } from '../../async-services/http/category.service';

@Injectable()
export class CategoryEffects {
  @Effect()
  loadCategories$: Observable<{}> = this.actions$.pipe(
    ofType(loadCategories),
    switchMap(() =>
      this.categoryService.getCategories().pipe(
        map((categories) => loadCategoriesSuccess({ categories })),
        catchError(() => of(loadCategoriesFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private categoryService: CategoryService) {}
}
