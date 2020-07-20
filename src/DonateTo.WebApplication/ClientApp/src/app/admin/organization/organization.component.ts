import { Component } from '@angular/core';
import { ColumnItem, DataItem } from './../../shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-admin',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent {
  constructor(protected router: Router) {}

  listOfColumns: ColumnItem[] = [
    {
      name: 'Admin.Name',
      sortFn: (a: DataItem, b: DataItem) => a.name.localeCompare(b.name),
      filterMultiple: true,
      listOfFilter: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filterFn: (list: string[], item: DataItem) => list.some((name) => item.name.indexOf(name) !== -1),
    },
    {
      name: 'Admin.Organization.Title',
      sortFn: (a: DataItem, b: DataItem) => a.organization.localeCompare(b.organization),
      filterMultiple: true,
      listOfFilter: [
        { text: 'Cognizant Softvision', value: 'Cognizant Softvision' },
        { text: 'Cognizant Softvision', value: 'Cognizant Softvision' },
      ],
      filterFn: (list: string[], item: DataItem) => list.some((organization) => item.name.indexOf(organization) !== -1),
    },
    {
      name: 'Admin.Email',
      sortFn: (a: DataItem, b: DataItem) => a.email.length - b.email.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'user@donateto.com', value: 'user@donateto.com' },
        { text: 'user2@donateto.com', value: 'user2@donateto.com' },
      ],
      filterFn: (list: string[], item: DataItem) => list.some((email) => item.name.indexOf(email) !== -1),
    },
    {
      name: 'Admin.Action',
    },
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      organization: 'Cognizant Softvision',
      email: 'user@donateto.com',
    },
    {
      key: '2',
      name: 'Jim Green',
      organization: 'Cognizant Softvision',
      email: 'user2@donateto.com',
    },
    {
      key: '3',
      name: 'Joe Black',
      organization: 'Cognizant Softvision',
      email: 'user3@donateto.com',
    },
  ];
}
