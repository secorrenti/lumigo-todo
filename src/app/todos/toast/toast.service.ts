import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class ToastService {
  readonly notify$ = new Subject<string>();
}
