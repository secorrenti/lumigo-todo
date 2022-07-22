import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodosService } from '../todos.service';

@Component({
  selector: 'lm-progress',
  template: `<span
    *ngFor="let bar of bars"
    [ngStyle]="{background: bar.color, left: bar.percentage + '%'}"
  ></span>`,
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnDestroy {

  private readonly subs = new Subscription();
  bars = [
    {color: '#f7f75c', percentage: 30},
    {color: '#2b44b4', percentage: 60},
  ];

  private todosLength = 0;
  private doLaterLength = 0;
  private completedLength = 0;

  constructor(
    service: TodosService
  ) {
    this.subs.add(service.todoList$.subscribe(todos => {
      this.todosLength = todos.length;
      this.calculate();
    }));
    this.subs.add(service.doLaterList$.subscribe(todos => {
      this.doLaterLength = todos.length;
      this.calculate();
    }));
    this.subs.add(service.completedList$.subscribe(completed => {
      this.completedLength = completed.length;
      this.calculate();
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private calculate() {
    const total = this.todosLength + this.doLaterLength + this.completedLength;
    if(!total) {
      this.todosLength = 0;
      this.doLaterLength = 0;
      this.completedLength = 0;
    } else {
      const todosPcnt = this.todosLength / total * 100;
      const doLaterPcnt = this.doLaterLength / total * 100;
      this.bars[0].percentage = todosPcnt;
      this.bars[1].percentage = todosPcnt + doLaterPcnt;
    }

  }

}
