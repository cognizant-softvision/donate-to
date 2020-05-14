import { BaseModel } from './baseModel';

export class OrganizationModel extends BaseModel {
  name: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactPosition: string;
  contactEmail: string;
}
