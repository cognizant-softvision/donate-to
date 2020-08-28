import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class FilterService {
  private filterSaved = new BehaviorSubject(0);
  currentFilter = this.filterSaved.asObservable();

  constructor() {}

  changeFilter(newFilter: number) {
    this.filterSaved.next(newFilter);
  }
}
