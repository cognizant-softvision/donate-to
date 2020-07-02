import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';
import { RoleModel } from './role.model';

export class UserModel extends BaseModel {
  firstName: string;
  lastName: string;
  identityNumber: string;
  isEnabled: boolean;
  passwordHash: string;
  fullName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  roles: RoleModel[];
  organizations: OrganizationModel[];
}
