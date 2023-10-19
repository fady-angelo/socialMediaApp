import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/compat';

@Component({
  selector: 'app-securety',
  templateUrl: './securety.component.html',
  styleUrls: ['./securety.component.scss']
})
export class SecuretyComponent implements OnInit {

  constructor(afAuth: AngularFireAuth) {
    const auth = afAuth.user;
    // this._angularFireAuth.currentUser.displayName;
    // var authData = afAuth.currentUser;
    // const user = auth().currentUser;
    console.log(auth);

    // const newPassword = getASecureRandomPassword();
    // user.updatePassword(newPassword).then(()=>{})
  }

  ngOnInit(): void {
  }


  // constructor(afAuth: AngularFireAuth) {
  //   const auth = afAuth.auth;
  //   const user = auth().currentUser;
  //   const newPassword = getASecureRandomPassword();

  // user.updatePassword(newPassword).then(function () {
  //     // Update successful.
  //   }).catch(function (error) {
  //     // An error happened.
  // });
  // }
}

