import { BaseModel } from './baseModel';

export class UserModel implements BaseModel {
  firstName: string;
  lastName: string;
  identityNumber: string;
  isEnabled: boolean;
  createdBy: string;
  createdDate: string;
  updateBy: string;
  updateDate: string;
  fullName: string;
  readOnly: true;
  id: number;
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
}
