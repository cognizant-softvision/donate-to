import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrganizationModel } from '../models/organization.model';

@Injectable()
export class EditOrganizationService {
  private organization: BehaviorSubject<OrganizationModel> = new BehaviorSubject(new OrganizationModel());
  currentOrganization = this.organization.asObservable();
  private isEditOrganization = new BehaviorSubject(false);
  currentIsEditOrganization = this.isEditOrganization.asObservable();
  private id = new BehaviorSubject(0);
  currentId = this.id.asObservable();

  constructor() {}

  changeIsEditOrganization(isEditOrganization: boolean) {
    this.isEditOrganization.next(isEditOrganization);
  }

  changeOrganization(editedOrganization: OrganizationModel) {
    this.organization.next(editedOrganization);
  }

  changeId(id: number) {
    this.id.next(id);
  }
}
