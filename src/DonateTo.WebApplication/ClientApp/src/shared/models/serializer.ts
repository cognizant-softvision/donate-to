import { Base } from "./base";

export interface Serializer {
    fromJson(json: any): Base;
    toJson(resource: Base): any;
  }