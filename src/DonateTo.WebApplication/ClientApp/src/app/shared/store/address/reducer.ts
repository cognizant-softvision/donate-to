import * as addressActions from './actions';
import { Action, createReducer, on } from '@ngrx/store';
import { CountryModel } from '../../models/country.model';
import { CityModel } from '../../models/city.model';
import { StateModel } from '../../models/state.model';
import { AddressModel } from '../../models';

export interface AddressState {
  loading: boolean;
  failed: boolean;
  countries: CountryModel[];
  states: StateModel[];
  cities: CityModel[];
  items: AddressModel[];
}

const INITIAL_STATE: AddressState = {
  loading: true,
  failed: false,
  countries: [],
  states: [],
  cities: [],
  items: [],
};

const addressReducer = createReducer(
  INITIAL_STATE,
  on(addressActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    failed: false,
    countries: [],
  })),
  on(addressActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    loading: false,
    failed: false,
    countries,
    states: [],
    cities: [],
  })),
  on(addressActions.loadCountriesFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(addressActions.loadStates, (state) => ({
    ...state,
    loading: true,
    failed: false,
    states: [],
    cities: [],
  })),
  on(addressActions.loadStatesSuccess, (state, { states }) => ({
    ...state,
    loading: false,
    failed: false,
    states,
    cities: [],
  })),
  on(addressActions.loadStatesFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(addressActions.loadCities, (state) => ({
    ...state,
    loading: true,
    failed: false,
    cities: [],
  })),
  on(addressActions.loadCitiesSuccess, (state, { cities }) => ({
    ...state,
    loading: false,
    failed: false,
    cities,
  })),
  on(addressActions.loadCitiesFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
  })),
  on(addressActions.loadAddressesByOrganizationId, (state, action) => ({
    ...state,
    loading: true,
    failed: false,
  })),
  on(addressActions.loadAddressesByOrganizationIdSuccess, (state, { addresses }) => ({
    ...state,
    loading: false,
    failed: false,
    items: addresses,
  })),
  on(addressActions.loadAddressesByOrganizationIdFailed, (state) => ({
    ...state,
    loading: false,
    failed: true,
    items: [],
  }))
);

export function reducer(state: AddressState, action: Action) {
  return addressReducer(state, action);
}
