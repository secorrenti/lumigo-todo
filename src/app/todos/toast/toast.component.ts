import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastService } from './toast.service';

@Component({
  selector: 'lm-toast',
  template: '{{issue}}',
  styleUrls: ['./toast.component.scss'],
  host: {'[class.show]': 'show'}
})
export class ToastComponent {

  private timer: NodeJS.Timeout;
  private readonly subs = new Subscription();
  issue: string;
  show = false;

  constructor(
    toastService: ToastService,
  ) {
    this.subs.add(toastService.notify$.subscribe(issue => this.showIssue(issue)));
  }

  showIssue(issue: string): void {
    if(this.timer) {
      clearTimeout(this.timer);
    }
    this.issue = issue;
    this.show = true;
    this.timer = setTimeout(() => this.show = false, 4000);
  }

}
