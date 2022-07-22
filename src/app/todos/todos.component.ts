import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag} from '@angular/cdk/drag-drop';
import { TodosService } from './todos.service';
import { SearchService } from './search/search.service';
import { ToastService } from './toast/toast.service';
import { DynamicLoaderService } from '../dynamic-loader.service';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'lm-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
  providers: [TodosService, SearchService, ToastService]
})
export class TodosComponent {

  todoList$ = this.todosService.todoList$;

  doLaterList$ = this.todosService.doLaterList$;

  completedList$ = this.todosService.completedList$;

  constructor(
    private todosService: TodosService,
    private dynamicLoaderService: DynamicLoaderService,
  ) {}

  addTask($event: string): void {
    this.todosService.addTask($event);
  }

  clearAllTasks(): void {
    this.todosService.clearAllTasks();
  }

  done(item: string, list: string[]): void {
    this.todosService.doneTask(item, list);
  }

  edit(task: string, list: string[]): void {
    const cmptRef = this.dynamicLoaderService.bound(EditTaskComponent);
    cmptRef.instance.setData(task);
    cmptRef.instance.done = (newValue: string) => {
      if(newValue) {
        this.todosService.updateTask(task, newValue, list);
      }
      this.dynamicLoaderService.destroy(cmptRef)
    };
  }


}
