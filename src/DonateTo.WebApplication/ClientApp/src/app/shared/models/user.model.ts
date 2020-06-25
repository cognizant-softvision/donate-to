import { BaseModel } from './base.model';
import { UserOrganizationModel } from './user-organization.model';
import { OrganizationModel } from './organization.model';

export class UserModel extends BaseModel {
  firstName: string;
  lastName: string;
  identityNumber: string;
  isEnabled: boolean;
  createdBy: string;
  createdDate: Date;
  updateBy: string;
  updateDate: Date;
  fullName: string;
  readOnly: true;
  userName: string;
  normalizedUserName: string;
  email: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  organizations: OrganizationModel[];
}
