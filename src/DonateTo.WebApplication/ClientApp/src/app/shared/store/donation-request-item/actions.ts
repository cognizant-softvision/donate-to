import { createAction, props } from '@ngrx/store';
import { DonationRequestItemModel } from '../../models';

export const removeDonationRequestItem = createAction(
  '[Donation Request Item] Remove',
  props<{ donationRequestItem: DonationRequestItemModel }>()
);
export const removeDonationRequestItemSuccess = createAction(
  '[Donation Request Item] Remove success',
  props<{ donationRequestItem: DonationRequestItemModel }>()
);
export const removeDonationRequestItemFailed = createAction('[Donation Request Item] Remove failed');
