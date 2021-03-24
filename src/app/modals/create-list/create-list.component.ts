import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { List } from 'src/app/models/list';
import {AngularFirestore} from "@angular/fire/firestore";
import firebase from "firebase";

export interface Item {
  Name: string;
  Owner: string;
  id: string;
}
@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {

  newListForm: FormGroup;

  constructor(private modalController: ModalController, private formBuilder: FormBuilder,
    private listService: ListService, private afs: AngularFirestore) {
   
  }

  ngOnInit(){
    this.newListForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
   })
  }

  dismissModal() {
      this.modalController.dismiss(); 
  }

  createNewList(){
    if(this.newListForm.valid){
      const tmp: List  = new List(this.newListForm.get('name').value);
      this.listService.create(tmp);
      this.dismissModal();
      const shirtsCollection = this.afs.collection<Item>('listes');
      shirtsCollection.add({ Name: tmp.name, Owner: firebase.auth().currentUser.uid , id:tmp.id});

    }
  }

  get errorControl() {
    return this.newListForm.controls;
  }

}
