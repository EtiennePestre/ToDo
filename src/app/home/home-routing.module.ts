import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {CreateTodoComponent} from "../create-todo/create-todo.component";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },{
    path: 'createTodo',
    component: CreateTodoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
