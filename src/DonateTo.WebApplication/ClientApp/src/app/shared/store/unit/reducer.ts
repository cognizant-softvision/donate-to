import * as unitActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { UnitModel } from '../../models';

export interface UnitState {
  loading: boolean;
  failed: boolean;
  items: UnitModel[];
}

const INITIAL_STATE: UnitState = {
  loading: false,
  failed: false,
  items: [],
};

const unitReducer = createReducer(
  INITIAL_STATE,
  on(unitActions.loadUnits, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(unitActions.loadUnitsSuccess, (state, { units }) => ({
    ...state,
    loading: false,
    failed: false,
    items: units,
  })),
  on(unitActions.loadUnitsFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  }))
);

export function reducer(state: UnitState, action: Action) {
  return unitReducer(state, action);
}
