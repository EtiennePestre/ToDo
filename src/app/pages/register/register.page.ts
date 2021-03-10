import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'todo-list-app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  public register: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private auth: AuthService,
    private route: Router,
    private toastController: ToastController) {
    this.register = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async registerForm() {
    if (this.register.valid) {
      try {
       const user = await this.auth.register(this.register.get('email').value, 
        this.register.get('password').value)
       const toast = await this.toastController.create({
            color: 'success',
            duration: 5000,
            message: `User created, an email confirmation as been sent to ${user.email}`
          });
    
          await toast.present();

          this.route.navigate(['login']);
      } catch (e) {
        const toast = await this.toastController.create({
          color: 'light',
          duration: 2000,
          message: e.message
        });
  
        await toast.present();
      }
    }
  }
}
