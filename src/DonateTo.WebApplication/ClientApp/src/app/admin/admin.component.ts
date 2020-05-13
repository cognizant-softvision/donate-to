import { Component, OnInit } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd';

@Component({
  import: [NzMenuModule],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
