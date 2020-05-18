import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AdminLayoutComponent implements OnInit {
  menus = [
    { title: 'Admin.Menu.Title.Donation', url: './donation', iconType: 'heart' },
    { title: 'Admin.Menu.Title.User', url: './user', iconType: 'team' },
    { title: 'Admin.Menu.Title.Organization', url: './organization', iconType: 'profile' },
  ];

  ngOnInit(): void {}
}
