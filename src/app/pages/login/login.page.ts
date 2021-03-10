import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'todo-list-app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public login : FormGroup;
  public withEmail: boolean;

  constructor( private formBuilder: FormBuilder,
    private toastController: ToastController, private route: Router,
    private auth: AuthService) {
    this.withEmail = false;
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  async loginForm(){
    if (this.login.valid) {
      try {
        await this.auth.login(this.login.get('email').value, 
        this.login.get('password').value);

        this.route.navigate(['home']);
      } catch (e) {
        const toast = await this.toastController.create({
          color: 'danger',
          duration: 2000,
          message: e.message
        });
  
        await toast.present();
      }
    }
  }
}
