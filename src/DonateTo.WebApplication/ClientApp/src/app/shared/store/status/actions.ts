import { createAction, props } from '@ngrx/store';
import { StatusModel } from '../../models';

export const loadStatus = createAction('[Status] Load items from server');
export const loadStatusSuccess = createAction('[Status] Load success', props<{ status: StatusModel[] }>());
export const loadStatusFailed = createAction('[Status] Load failed');
