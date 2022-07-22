import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ProgressComponent } from "./progress/progress.component";
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { SearchComponent } from "./search/search.component";
import { TodoComponent } from "./todo/todo.component";
import { TodosComponent } from "./todos.component";
import { ListTodoComponent } from "./list-todo/list-todo.component";
import { IconComponent } from "./icon/icon.component";
import { SearchPipe } from "./search/search.pipe";
import { ToastComponent } from "./toast/toast.component";



const imports = [
  CommonModule,
  DragDropModule,
  FormsModule,
];

const exports = [
  TodosComponent,
];

const declarations = [
  ...exports,
  SearchPipe,
  SearchComponent,
  AddTodoComponent,
  TodoComponent,
  ListTodoComponent,
  ProgressComponent,
  IconComponent,
  ToastComponent,
];

@NgModule({
  imports, declarations, exports
})
export class TodosModule {
}
