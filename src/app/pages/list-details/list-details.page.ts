import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {Observable} from "rxjs";
export interface Item {
  Name: string;
  Description: string;
  List: string;
}
@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private listId: string;
  private todos: Observable<DocumentChangeAction<Item>[]>;
  private itemsCollection: AngularFirestoreCollection<Item>;

  constructor(private listService: ListService, private modalController: ModalController, private route: ActivatedRoute, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('todo');
    this.todos = this.itemsCollection.snapshotChanges( );
  }

  ngOnInit() {
  this.listId = this.route.snapshot.paramMap.get('listId');
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateTodoComponent,
      componentProps: {
        'listId': this.listId
      }
    });
    return await modal.present();
  }

  delete(todo:string){
    const shirtsCollection = this.afs.doc<Item>('todo/'+todo);
    shirtsCollection.delete();
  }

}
