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
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {map, switchAll, switchMap} from "rxjs/operators";
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
  usr$: BehaviorSubject<string|null>;



  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<DocumentChangeAction<Item>[]>;
  items2: DocumentChangeAction<Item>[];

  constructor(private listService: ListService, public modalController: ModalController, private afs: AngularFirestore) {
    const user$ = new Subject<string>();
    const queryObservable = user$.pipe(
        switchMap(user =>

            afs.collection<Item>('listes', ref => ref.where('Owner', '==', user)).snapshotChanges(

            )
        )
    );

    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      this.items2=queriedItems;
      console.log(queriedItems);
    });
    this.items=queryObservable;


    this.lists=[];
    this.usr$ = new BehaviorSubject(null);
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.


      this.usr$ = new BehaviorSubject(null);
      user$.next(firebase.auth().currentUser.uid);
      //this.items = afs.collectionGroup('listes').snapshotChanges( ).pipe();

      //this.items = afs.collectionGroup('listes', ref => ref.where('user', '==', user)).snapshotChanges( );


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
