import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateTodoComponent } from 'src/app/modals/create-todo/create-todo.component';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import { ActivatedRoute } from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, DocumentChangeAction} from "@angular/fire/firestore";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {switchMap} from "rxjs/operators";
import firebase from "firebase";
export interface Item {
  Name: string;
  Description: string;
  ListId: string;
}
@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.page.html',
  styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit {
  private listId: string;
  private todos: Observable<DocumentChangeAction<Item>[]>;
  private todos2: DocumentChangeAction<Item>[];
  private itemsCollection: AngularFirestoreCollection<Item>;
  list$: BehaviorSubject<string|null>;

  constructor(private listService: ListService, private modalController: ModalController, private route: ActivatedRoute, private afs: AngularFirestore) {


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
    const listId$ = new Subject<string>();
    const queryObservable = listId$.pipe(
        switchMap(listId =>
            this.afs.collection<Item>('todo', ref => ref.where('ListId', '==', listId)).snapshotChanges(
            )
        )
    );

    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      this.todos2=queriedItems;
      console.log(queriedItems);
    });
    this.todos=queryObservable;

    this.list$ = new BehaviorSubject(null);
    listId$.next(this.listId);
    console.log(this.listId);
    return await modal.present();
  }

  delete(todo:string){
    const shirtsCollection = this.afs.doc<Item>('todo/'+todo);
    shirtsCollection.delete();
  }

}
