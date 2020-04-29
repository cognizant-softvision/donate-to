import { BaseModel } from './baseModel';

export interface Serializer {
    fromJson(json: any): BaseModel;
    toJson(resource: BaseModel): any;
  }
