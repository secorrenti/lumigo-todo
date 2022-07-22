import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'lm-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
  animations: [
    trigger('dialogCoverAnim', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: `translateY(-10%)`
        }),
        animate('500ms', style({
          opacity: 1,
          transform: `translateY(0%)`
        })),
      ]),
    ])
  ],
})
export class EditTaskComponent {

  currentTask: string;

  done: (newValue: string) => void;

  setData(task: string): void {
    this.currentTask = task;
  }


  update(newValue: string): void {
    this.done(newValue)
  }

  cancel(): void {
    this.done(null);
  }

}
