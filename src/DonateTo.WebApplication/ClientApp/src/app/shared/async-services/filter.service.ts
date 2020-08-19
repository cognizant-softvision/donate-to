import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class FilterService {
  private filterSaved = new BehaviorSubject('');
  currentFilter = this.filterSaved.asObservable();

  constructor() {}

  changeFilter(newFilter: string) {
    this.filterSaved.next(newFilter);
  }
}
