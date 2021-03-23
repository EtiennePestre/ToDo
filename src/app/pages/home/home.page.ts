import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list';
import { ListService } from '../../services/list.service';
import { ModalController } from '@ionic/angular';
import { CreateListComponent } from '../../modals/create-list/create-list.component';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChange,
  DocumentChangeAction
} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import firebase from "firebase";

export interface Item {
  Name: string;
  Owner: string;
  id: string;
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private lists: List[];



  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<DocumentChangeAction<Item>[]>;

  constructor(private listService: ListService, public modalController: ModalController, private afs: AngularFirestore) {
    this.lists=[];

    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.itemsCollection = afs.collection<Item>('listes');
    this.items = this.itemsCollection.snapshotChanges( );
  }

  ngOnInit(){
    this.lists = this.listService.getAll();
  }

  async openCreateModal(){
    const modal = await this.modalController.create({
      component: CreateListComponent,
    });
    return await modal.present();
  }

  delete(list: string){
    const shirtsCollection = this.afs.doc<Item>('listes/'+list);
    shirtsCollection.delete();


  }
}
