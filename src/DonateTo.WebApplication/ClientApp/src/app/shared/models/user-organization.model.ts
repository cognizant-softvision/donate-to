import { UserModel } from './user.model';
import { OrganizationModel } from './organization.model';

export class UserOrganizationModel {
  user: UserModel;
  organizations: OrganizationModel[];
}
