import {
  loadCities,
  loadCitiesFailed,
  loadCitiesSuccess,
  loadCountries,
  loadCountriesFailed,
  loadCountriesSuccess,
  loadStates,
  loadStatesFailed,
  loadStatesSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { CityService } from '../../async-services/http/city.service';
import { StateService } from '../../async-services/http/state.service';
import { CountryService } from '../../async-services/http/country.service';

@Injectable()
export class AddressEffects {
  @Effect()
  loadCountries$: Observable<{}> = this.actions$.pipe(
    ofType(loadCountries),
    switchMap(() =>
      this.countryService.get().pipe(
        map((countries) => loadCountriesSuccess({ countries })),
        catchError(() => of(loadCountriesFailed()))
      )
    )
  );

  @Effect()
  loadStates$: Observable<{}> = this.actions$.pipe(
    ofType(loadStates),
    switchMap(({ countryId }) =>
      this.stateService.getByCountry(countryId).pipe(
        map((states) => loadStatesSuccess({ states })),
        catchError(() => of(loadStatesFailed()))
      )
    )
  );

  @Effect()
  loadCities$: Observable<{}> = this.actions$.pipe(
    ofType(loadCities),
    switchMap(({ stateId }) =>
      this.cityService.getByState(stateId).pipe(
        map((cities) => loadCitiesSuccess({ cities })),
        catchError(() => of(loadCitiesFailed()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cityService: CityService,
    private stateService: StateService,
    private countryService: CountryService
  ) {}
}
