import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {ListService} from "../services/list.service";
import {List} from "../list";
import {log} from "util";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  name = new FormControl();
  constructor(public listService:ListService,private modalControler:ModalController) { }

  ngOnInit() {}

  create():void{
    log(name);
    this.listService.create(new List(name,[]));

  }

}
