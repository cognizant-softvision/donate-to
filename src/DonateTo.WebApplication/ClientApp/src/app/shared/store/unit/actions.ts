import { createAction, props } from '@ngrx/store';
import { UnitModel } from '../../models';

export const loadUnits = createAction('[Unit] Load items from server');
export const loadUnitsSuccess = createAction('[Unit] Load success', props<{ units: UnitModel[] }>());
export const loadUnitsFailed = createAction('[Unit] Load failed');
