import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DynamicLoaderService } from './dynamic-loader.service';
import { TodosModule } from './todos/todos.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TodosModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [DynamicLoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
