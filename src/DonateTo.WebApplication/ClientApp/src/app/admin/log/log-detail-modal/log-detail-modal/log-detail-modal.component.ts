import { Component, Input, OnInit } from '@angular/core';
import { LogModel } from 'src/app/shared/models/log.model';

@Component({
  selector: 'app-log-detail-modal',
  templateUrl: './log-detail-modal.component.html',
  styleUrls: ['./log-detail-modal.component.css'],
})
export class LogDetailModalComponent implements OnInit {
  log: LogModel;
  isVisible = false;

  constructor() {}

  ngOnInit(): void {}

  showModal(log: LogModel) {
    this.log = log;
    this.isVisible = !this.isVisible;
  }

  closeModal() {
    this.isVisible = !this.isVisible;
  }

  printLogEvent(log: LogModel): string {
    return log.logEvent;
  }
}
