import { BaseModel } from './baseModel';

export class OrganizationModel implements BaseModel {
  name: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactPosition: string;
  contactEmail: string;
  id: number;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
}
