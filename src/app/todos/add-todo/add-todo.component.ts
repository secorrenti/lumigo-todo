import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lm-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  task = '';
  @Output() addTask = new EventEmitter<string>();


  keyup($event: KeyboardEvent): void {
    if($event.key === 'Enter') {
      this.buttonClick();
    }
  }


  buttonClick(): void {
    if(this.task) {
      this.addTask.emit(this.task);
      this.task = '';
    }
  }
}
