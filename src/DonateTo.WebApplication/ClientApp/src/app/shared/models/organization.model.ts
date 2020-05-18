import { BaseModel } from './base.model';

export class OrganizationModel extends BaseModel {
  name: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactPosition: string;
  contactEmail: string;
}
