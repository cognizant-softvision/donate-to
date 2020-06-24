import { UserModel } from './user.model';
import { OrganizationModel } from './organization.model';

export class UserOrganization {
  user: UserModel;
  organizations: OrganizationModel[];
}
