import { Component, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { addDoc, Firestore, collection, getFirestore, getDoc, doc, getDocs } from '@angular/fire/firestore'

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification, UserCredential } from '@angular/fire/auth';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  imgChangeEvent: any = "";
  croppedImage: any = "";

  passwordMath: boolean = true;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-z]{1,}$/)]),
    lastName: new FormControl("", [Validators.required, Validators.pattern(/^[a-zA-z]{1,}$/)]),
    age: new FormControl("", [Validators.required, Validators.min(16), Validators.max(60)]),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
    password: new FormControl("", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    confirmPassword: new FormControl("", [Validators.required]),
    userName: new FormControl("", [Validators.required, Validators.pattern(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)]),
    phoneNumber: new FormControl("", [Validators.required]),
    userImg: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    city: new FormControl("", [Validators.required]),
  })
  public users: any = [];
  base64: any = '';

  constructor(
    public _auth: AuthService,
    public firestore: Firestore,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private readonly auth: Auth
  ) {
  }

  ngOnInit(): void {
  }

  goToTwoStep(e: any) {
    let halfOne: any = document.querySelector(".half-one")
    let numTwo: any = document.getElementById("two")
    e.target.parentElement.parentElement.parentElement.parentElement.children[1].style.transform = "translate(0, -80vh) scale(1)"
    e.target.parentElement.parentElement.parentElement.style.transform = "translate(-100%, 0) scale(0)";
    numTwo.classList.add("active")
    halfOne.classList.add("active-line")
  }
  goToThreeStep(e: any) {
    let halfTwo: any = document.querySelector(".half-two")
    let numthree: any = document.getElementById("three")
    e.target.parentElement.parentElement.parentElement.parentElement.children[2].style.transform = "translate(0, calc(-80vh * 2)) scale(1)"
    e.target.parentElement.parentElement.parentElement.style.transform = "translate(-100%, -80vh) scale(0)"
    numthree.classList.add("active")
    halfTwo.classList.add("active-line")
  }
  backToOneStep(e: any) {
    let halfOne: any = document.querySelector(".half-one")
    let numTwo: any = document.getElementById("two")
    numTwo.classList.remove("active")
    e.target.parentElement.parentElement.parentElement.style.transform = "translate(100%, -80vh) scale(0)"
    e.target.parentElement.parentElement.parentElement.parentElement.children[0].style.transform = "translate(0, 0) scale(100%)"
    halfOne.classList.remove("active-line")
  }
  backToTwoStep(e: any) {
    let halfTwo: any = document.querySelector(".half-two")
    let numThree: any = document.getElementById("three")
    numThree.classList.remove("active")
    e.target.parentElement.parentElement.parentElement.style.transform = "translate(100%, calc(-80vh * 2)) scale(0)"
    e.target.parentElement.parentElement.parentElement.parentElement.children[1].style.transform = "translate(0, -80vh) scale(100%)"
    halfTwo.classList.remove("active-line")
  }

  register(values: any) {
    if (this.registerForm.valid) {
      this.signUp(this.registerForm.controls?.["email"].value, this.registerForm.controls?.["password"].value);
    }
  }
  get controlName() {
    return this.registerForm.controls
  }
  checkConfirmPassword() {
    if (this.controlName?.['confirmPassword'].value == this.controlName?.['password'].value) {
      this.passwordMath = true;
    } else {
      this.passwordMath = false;
    }
  }

  // addData(value: any) {
  //   const dbInstance = collection(this.firestore, "users")
  //   addDoc(dbInstance, value)
  //     .then(() => {
  //       alert('Data Sent')
  //     })
  //     .catch((err) => {
  //       alert(err.message)
  //     })
  // }

  // getData() {
  //   const dbInstance = collection(this.firestore, 'usersIn');
  //   getDocs(dbInstance)
  //     .then((res) => {
  //       this.users = [...res.docs.map((item) => {
  //         return { ...item.data(), id: item.id }
  //       })]
  //       console.log(this.users);
  //     })
  // }


  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: any = {
      uid: user.uid,
      email: user.email,
      firstName: this.registerForm.controls?.['firstName'].value,
      lastName: this.registerForm.controls?.['lastName'].value,
      age: this.registerForm.controls?.['age'].value,
      userName: this.registerForm.controls?.['userName'].value,
      phoneNumber: this.registerForm.controls?.['phoneNumber'].value,
      userImg: this.registerForm.controls?.['userImg'].value,
      country: this.registerForm.controls?.['country'].value,
      city: this.registerForm.controls?.['city'].value,
    };
    console.log(userData);

    return userRef.set(userData, {
      merge: true,
    });
  }

  signUp(email: string, password: string): any {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this._auth.sendVerificationMail();
        this.setUserData(result.user);
        // this.setUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // getImgPath(e: any) {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     this.base64 = reader.result;
  //     this.registerForm.get('userImg')?.setValue(this.base64);
  //     console.log(this.base64);
  //   }
  // }

  onFileChange(e: any) {
    const cropperImage: any = document.querySelector(".cropper-image");
    cropperImage.style.display = "flex"
    this.imgChangeEvent = e;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  getImgPath() {
    this.registerForm.get('userImg')?.setValue(this.croppedImage);
  }

  updateUserImg() { }
}
