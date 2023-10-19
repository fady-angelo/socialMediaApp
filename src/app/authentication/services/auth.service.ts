import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from '@firebase/util';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/compat';
import { Auth } from 'firebase/auth';
import { RegisterComponent } from '../register/register.component';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  fireRegister: boolean = false;
  users: any = [];
  allUsers: any = {};
  dataCurrentUser?: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public firestore: Firestore,
    public http: HttpClient,
    // public register: RegisterComponent
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign In With Email/Password
  signIn(email: string, password: string): any {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['/home']);
            localStorage.setItem("uid", JSON.stringify(result.user?.uid))
            const dbInstance = collection(this.firestore, 'users');
            getDocs(dbInstance)
              .then((res) => {
                this.users = [...res.docs.map((item) => {
                  return { ...item.data(), id: item.id }
                })]
                this.users.filter((item: any) => {
                  if (item.uid == JSON.parse(localStorage.getItem('uid')!)) {
                    this.dataCurrentUser = item;
                    localStorage.setItem("currentUserData", JSON.stringify(this.dataCurrentUser))
                  }
                })
              })
          }
        })
        this.fireRegister = true;
      })
      .catch((error) => {
        alert(error.message);
        this.fireRegister = false;
      })
  }
  // signinUser(email: string, password: string) {
  //   firebase.auth().signInWithEmailAndPassword(email, password)
  //     .then(
  //       response => {
  //         firebase.auth().currentUser.getToken()
  //           .then(
  //             (token: string) => this.token = token
  //           )
  //       }
  //     )
  //     .catch(
  //       error => console.log(error)
  //     );
  // }


  // Sign Un With Email/Password
  // signUp(email: string, password: string): any {
  //   return this.afAuth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign
  //       up and returns promise */
  //       this.sendVerificationMail();
  //       this.allUsers = result.user;
  //       this.setUserData(result.user);
  //     })
  //     .catch((error) => {
  //       window.alert(error.message);
  //     });
  // }
  // Send email verfificaiton when new user sign up
  sendVerificationMail(): any {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['/auth/verify-email'])
      })
  }
  forgotPassword(passwordResetEmail: string): any {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }
  // Sign in with Google
  googleAuth(): any {
    return this.authLogin(new auth.GoogleAuthProvider())
      .then((result: any) => {
        this.router.navigate(['/home'])
      })
  }
  // Auth logic to run auth providers
  authLogin(provider: any): any {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['dashboard']);
        // this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // setUserData(user: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(
  //     `users/${user.uid}`
  //   );
  //   const userData: any = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //     // firstName: this.register.registerForm.controls?.['firstName'].value,
  //   };
  //   return userRef.set(userData, {
  //     merge: true,
  //   });
  // }
  // Sign out
  signOut(): any {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/auth/login']);
    });
  }
  // Create New User

  getData() {
    const dbInstance = collection(this.firestore, 'usersIn');
    getDocs(dbInstance)
      .then((res) => {
        this.users = [...res.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
      })
  }
}

  // console.log(this.users);
