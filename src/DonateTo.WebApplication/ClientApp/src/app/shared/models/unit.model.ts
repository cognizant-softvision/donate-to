import { BaseModel } from './base.model';
import { UnitTypeModel } from './unit-type.model';

export class UnitModel extends BaseModel {
  name: string;
  description: string;
  code: string;
  unitTypeId: number;
  unitType: UnitTypeModel;
}
