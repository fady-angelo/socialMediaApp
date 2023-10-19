import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  imgChangeEvent: any = "";
  croppedImage: any = "";

  currentUserId: string = JSON.parse(localStorage.getItem('uid')!);
  currentUserData: any = JSON.parse(localStorage.getItem('currentUserData')!)

  updateDataForm: FormGroup = new FormGroup({
    firstName: new FormControl(`${this.currentUserData.firstName}`),
    lastName: new FormControl(`${this.currentUserData.lastName}`),
    age: new FormControl(`${this.currentUserData.age}`),
    userName: new FormControl(`${this.currentUserData.userName!}`),
    country: new FormControl(`${this.currentUserData.country}`),
    city: new FormControl(`${this.currentUserData.city}`),
    phoneNumber: new FormControl(`${this.currentUserData.phoneNumber}`),
    userImg: new FormControl(`${this.currentUserData.userImg}`),
  })

  constructor(public afs: AngularFirestore) { }

  ngOnInit(): void {
    const userProfileImg: any = document.querySelectorAll(".user-profile-img");
    userProfileImg.forEach((element: any) => {
      element.src = this.currentUserData.userImg
    });
  }

  updateData() {
    this.afs.collection('users').doc(this.currentUserId).update(this.updateDataForm.value);
    localStorage.setItem('currentUserData', JSON.stringify(this.updateDataForm.value))
  }

  onFileChange(e: any) {
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
  updateUserImg() {
    this.afs.collection('users').doc(this.currentUserId).update({ userImg: this.croppedImage }).then(() => {
      this.updateDataForm.controls?.['userImg'].setValue(this.croppedImage)
      localStorage.setItem('currentUserData', JSON.stringify(this.updateDataForm.value))
    })
      .then(() => {
        window.location.reload()
      })
  }

}
