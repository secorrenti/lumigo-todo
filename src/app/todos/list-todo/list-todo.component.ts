import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, ContentChild, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SearchService } from '../search/search.service';
import { TodosService } from '../todos.service';

declare const $: any;

@Component({
  selector: 'lm-list-todo',
  templateUrl: './list-todo.component.html',
  styleUrls: ['./list-todo.component.scss']
})
export class ListTodoComponent implements OnDestroy {

  search: string;
  private readonly subs = new Subscription();
  @Input() headerText: string;
  @Input() tasksList: Observable<string[]>;
  @ContentChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor(
    private todosService: TodosService,
    searchService: SearchService,
  ) {
    this.subs.add(searchService.search$.subscribe(search => {
      this.search = search;
    }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  collapse(container: HTMLUListElement): void {
    $(container).slideToggle();
  }

  drop($event: CdkDragDrop<string[]>) {
    this.todosService.drop($event);
  }

  remove(item: string, list: string[]): void {
    this.todosService.removeTask(item, list);
  }

}
