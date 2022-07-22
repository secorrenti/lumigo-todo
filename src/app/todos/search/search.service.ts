import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable()
export class SearchService {

  private readonly _search$ = new BehaviorSubject<string>(null);

  get search$(): Observable<string> {
    return this._search$.asObservable();
  }

  searchChange(value: string) {
    this._search$.next(value);
  }

}
