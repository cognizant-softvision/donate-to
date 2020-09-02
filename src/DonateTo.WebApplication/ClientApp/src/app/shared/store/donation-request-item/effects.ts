import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DonationRequestItemService } from '../../async-services/http/donation-request-item.service';
import {
  removeDonationRequestItem,
  removeDonationRequestItemFailed,
  removeDonationRequestItemSuccess,
} from './actions';

@Injectable()
export class DonationRequestItemEffects {
  @Effect()
  removeDonationRequestItem$: Observable<{}> = this.actions$.pipe(
    ofType(removeDonationRequestItem),
    switchMap((data: any) =>
      this.donationRequestItemService.deleteDonationRequestItem(data.donationRequestItem).pipe(
        map((donationRequestItem) => removeDonationRequestItemSuccess({ donationRequestItem })),
        catchError(() => of(removeDonationRequestItemFailed()))
      )
    )
  );

  constructor(private actions$: Actions, private donationRequestItemService: DonationRequestItemService) {}
}
