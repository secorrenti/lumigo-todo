import { Component, Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { TodosKeys } from './todos.utils';
import { ToastService } from './toast/toast.service';

declare const $: any;

@Injectable()
export class TodosService {

  private readonly _todoList$ = new BehaviorSubject<string[]>([]);
  private readonly _doLaterList$ = new BehaviorSubject<string[]>([]);
  private readonly _completedList$ = new BehaviorSubject<string[]>([]);

  constructor(
    private toastService: ToastService,
  ) {
    this.loadData();
  }

  get todoList$(): Observable<string[]> {
    return this._todoList$.asObservable();
  }

  get doLaterList$(): Observable<string[]> {
    return this._doLaterList$.asObservable();
  }

  get completedList$(): Observable<string[]> {
    return this._completedList$.asObservable();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.saveLists();
  }

  addTask($event: string): void {
    if (this.alreadyExist($event)) {
      this.toastService.notify$.next(`Cannot add task, "${$event}" already exist`);
    } else {
      const todo = this._todoList$.getValue();
      todo.unshift($event);
      this._todoList$.next(todo);
      this.saveLists();
    }
  }

  doneTask(item: string, list: string[]) {
    const index = list.indexOf(item);
    list.splice(index, 1);
    const completeList = this._completedList$.getValue();
    completeList.unshift(item);
    this.saveLists();
  }

  removeTask(item: string, list: string[]): void {
    const index = list.indexOf(item);
    list.splice(index, 1);
    this.saveLists();
  }

  clearAllTasks(): void {
    this._todoList$.next([]);
    this._doLaterList$.next([]);
    this._completedList$.next([]);
  }

  updateTask(oldValue: string, newValue: string, list: string[]) {
    if(this.alreadyExist(newValue)) {
      this.toastService.notify$.next(`Cannot update task, "${newValue}" already exist`);
    } else {
      const index = list.findIndex(task => oldValue === task);
      list[index] = newValue;
      this.saveLists();
    }
  }

  private alreadyExist($event: string): boolean {
    const todo = this._todoList$.getValue();
    const doLater = this._doLaterList$.getValue();
    const complete = this._completedList$.getValue();
    return [...todo, ...doLater, ...complete].some(task => task === $event);
  }


  private saveLists(): void {
    localStorage.setItem(TodosKeys.todoList, JSON.stringify(this._todoList$.getValue()));
    localStorage.setItem(TodosKeys.doLaterList, JSON.stringify(this._doLaterList$.getValue()));
    localStorage.setItem(TodosKeys.completedList, JSON.stringify(this._completedList$.getValue()));
    this.loadData();
  }


  private loadData(): void {
    this._todoList$.next(this.getList(TodosKeys.todoList));
    this._doLaterList$.next(this.getList(TodosKeys.doLaterList));
    this._completedList$.next(this.getList(TodosKeys.completedList));
  }


  private getList(key: TodosKeys): string[] {
    const list = localStorage.getItem(key) || '[]';
    return JSON.parse(list)
  }

}
