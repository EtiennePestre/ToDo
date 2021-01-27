import { Injectable } from '@angular/core';
import { List } from '../list';
import {Todo} from "../todo";
@Injectable({
  providedIn: 'root'
})
export class ListService {
  lists: List[]

  constructor() {
    this.lists=[];
    this.lists.push(new List("test1",[]));
    this.lists.push(new List("test2",[]));
    this.lists.push(new List("test3",[]));
  }

  getAll():List[]{
    return this.lists;
  }

  getOne(id:string):List{
    return this.lists.find(l=>l.id===id);
  }

  create(list:List):void{
    this.lists.push(list);
  }
}
