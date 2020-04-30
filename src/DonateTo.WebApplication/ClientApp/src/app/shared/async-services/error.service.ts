import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()

export class ErrorService {
    private errors = new Subject<string[]>();

    constructor() { }

    /**
   * Adds a new value to the Subject
   *
   * @param errors - List of string
   * @returns void
   */
    public addErrors = (errors: string[]): void =>
        this.errors.next(errors)

    /**
   *  Observable that the Subject casts to
   *
   * @returns Observable
   */
    public getErrors = () =>
        this.errors.asObservable()
}
