import { Component } from '@angular/core';
import { List } from '../list';
import {ListService} from "../services/list.service";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(public listService:ListService,private modalControler:ModalController) {

  }




}
