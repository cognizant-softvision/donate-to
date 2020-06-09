import { BaseModel } from './base.model';
import { CityModel } from './city.model';

export class StateModel extends BaseModel {
  name: string;
  countryId: number;
  cities: CityModel[];
}
