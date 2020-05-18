import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit {
  menus = [
    { title: 'Admin.Donation.Title', url: './donation', iconType: 'heart' },
    { title: 'Admin.User.Title', url: './user', iconType: 'team' },
    { title: 'Admin.Organization.Title', url: './organization', iconType: 'profile' },
  ];

  ngOnInit(): void {}
}
