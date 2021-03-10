import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user$: BehaviorSubject<firebase.default.User>

  constructor( private afAuth: AngularFireAuth, 
    private af: AngularFirestore ) { 
      this.user$ = new BehaviorSubject(null);
      this.afAuth.onAuthStateChanged(user => 
        this.user$.next(user))
    }

    getConnectedUser(){
      return this.user$.asObservable();
    }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    return await this.afAuth.signOut();
  }

  async register(email: string, password: string) {
    const cred = await this.afAuth.createUserWithEmailAndPassword(
      email, 
      password
      );
      
      await cred.user.sendEmailVerification();
      return cred.user;
  }
}
