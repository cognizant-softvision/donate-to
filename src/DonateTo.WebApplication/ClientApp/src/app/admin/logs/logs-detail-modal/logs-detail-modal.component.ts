import { Component } from '@angular/core';
import { LogModel } from 'src/app/shared/models/log.model';

@Component({
  selector: 'app-log-detail-modal',
  templateUrl: './logs-detail-modal.component.html',
  styleUrls: ['./logs-detail-modal.component.less'],
})
export class LogsDetailModalComponent {
  log: LogModel;
  isVisible = false;

  constructor() {}

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
