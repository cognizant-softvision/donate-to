import { Action } from '@ngrx/store';

interface Donation {
  id: number;
  name: string;
}

export enum ActionTypes {
  ADD = '[Donation] Add donation',
  REMOVE = '[Donation] Remove donation',
  LOAD_ITEMS = '[Donation] Load items from server',
  LOAD_SUCCESS = '[Donation] Load success'
}

export class AddItem implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: Donation) {}
}

export class GetItems implements Action {
  readonly type = ActionTypes.LOAD_ITEMS;
}

export class RemoveItem implements Action {
  readonly type = ActionTypes.REMOVE;

  constructor(public payload: Donation) {}
}

export class LoadItems implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: Donation[]) {}
}

export type ActionsUnion = AddItem | RemoveItem | LoadItems | GetItems;
