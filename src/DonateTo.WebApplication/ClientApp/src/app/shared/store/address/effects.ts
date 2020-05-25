import {
  loadAddressesByOrganizationId,
  loadAddressesByOrganizationIdFailed,
  loadAddressesByOrganizationIdSuccess,
} from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AddressService } from '../../async-services/http/address.service';

@Injectable()
export class AddressEffects {
  @Effect()
  loadAddressesByOrganizationId$: Observable<{}> = this.actions$.pipe(
    ofType(loadAddressesByOrganizationId),
    switchMap((data) =>
      this.addressService.getAddressesByOrganizationId(data.organizationId).pipe(
        map((addresses) => loadAddressesByOrganizationIdSuccess({ addresses })),
        catchError(() => of(loadAddressesByOrganizationIdFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private addressService: AddressService) {}
}
