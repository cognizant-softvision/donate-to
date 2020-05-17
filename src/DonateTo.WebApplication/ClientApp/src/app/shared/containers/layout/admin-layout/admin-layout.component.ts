import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit {
  menus = [
    { title: 'Admin.Donations', url: './donation', iconType: 'heart' },
    { title: 'Admin.Users', url: './user', iconType: 'team' },
    { title: 'Admin.Organization', url: './organization', iconType: 'profile' },
  ];

  ngOnInit(): void {}
}
