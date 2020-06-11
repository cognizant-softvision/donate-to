import { BaseModel } from './base.model';
import { StateModel } from './state.model';

export class CountryModel extends BaseModel {
  name: string;
  sortName: string;
  phoneCode: number;
  states: StateModel[];
}
