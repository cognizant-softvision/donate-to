import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { UnitState } from './reducer';
import { Injectable } from '@angular/core';

// selectors
export const getUnitState = createFeatureSelector<UnitState>('unit');

export const getAllUnits = createSelector(getUnitState, (state: UnitState) => state.items);

export const getUnitLoading = createSelector(getUnitState, (state: UnitState) => state.loading);

@Injectable()
export class UnitSelectors {
  constructor(private store: Store<UnitState>) {}
  // selectors$
  units$ = this.store.select(getAllUnits);
  unitState$ = this.store.select(getUnitState);
  loading$ = this.store.select(getUnitLoading);
}
