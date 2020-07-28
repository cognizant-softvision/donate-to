import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataUpdatedService {
  private dataSaved = new BehaviorSubject(false);
  currentStatus = this.dataSaved.asObservable();

  constructor() {}

  changeMessage(updated: boolean) {
    this.dataSaved.next(updated);
  }
}
