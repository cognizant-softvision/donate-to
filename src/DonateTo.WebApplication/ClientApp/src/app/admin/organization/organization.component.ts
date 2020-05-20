import { Component } from '@angular/core';
import { ColumnItem, DataItem } from './../../shared/models';

@Component({
  selector: 'app-organization-admin',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
})
export class OrganizationComponent {
  constructor() {}

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
      name: 'Admin.Age',
      sortFn: (a: DataItem, b: DataItem) => a.age - b.age,
      sortDirections: ['descend', null],
    },
    {
      name: 'Admin.Address',
      sortFn: (a: DataItem, b: DataItem) => a.address.length - b.address.length,
      filterMultiple: false,
      listOfFilter: [
        { text: 'London', value: 'London' },
        { text: 'Sidney', value: 'Sidney' },
      ],
      filterFn: (address: string, item: DataItem) => item.address.indexOf(address) !== -1,
    },
    {
      name: 'Admin.Action',
    },
  ];

  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];
}
