import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListService } from 'src/app/services/list.service';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo';
import { ActivatedRoute } from '@angular/router';
import firebase from "firebase";
import {AngularFirestore} from "@angular/fire/firestore";
import {List} from "../../models/list";
export interface Item {
  Name: string;
  Description: string;
  ListId: string;
}
@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  @Input() listId: string;

  private newTodoForm: FormGroup;

  constructor(private listService: ListService, private formBuilder: FormBuilder, private modalController: ModalController, private afs: AngularFirestore) { }

ngOnInit(){
    this.newTodoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.maxLength(255)]],
   })
  }

  dismissModal() {
      this.modalController.dismiss(); 
  }

  createNewTodo(){
    if(this.newTodoForm.valid){
      const tmp: Todo  = new Todo(this.newTodoForm.get('name').value, this.newTodoForm.get('description').value);
      const shirtsCollection = this.afs.collection<Item>('todo');
      firebase.auth().currentUser.getIdToken(true).then((user)=>{
        shirtsCollection.add({ Name: tmp.name, Description: tmp.description , ListId:this.listId});
      });

    }
  }

  get errorControl() {
    return this.newTodoForm.controls;
  }

}
