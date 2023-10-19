import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { AuthService } from 'src/app/authentication/services/auth.service';


import { Validators } from "@angular/forms";
import {
  SearchCountryField,
  CountryISO,
  PhoneNumberFormat
} from "ngx-intl-tel-input";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [
    CountryISO.Colombia,
    CountryISO.UnitedStates,
    CountryISO.Canada,
    CountryISO.Mexico
  ];
  public phoneForm = new FormGroup({
    phone: new FormControl("", [Validators.required])
  });





  users: any = [];
  dataCurrentUser?: any;
  currentUserId: string = JSON.parse(localStorage.getItem('uid')!);
  currentUserData: any = JSON.parse(localStorage.getItem('currentUserData')!)

  imgChangeEvent: any = "";
  croppedImage: any = "";



  updateDataForm: FormGroup = new FormGroup({
    firstName: new FormControl(`${this.currentUserData.firstName}`),
    lastName: new FormControl(`${this.currentUserData.lastName}`),
    age: new FormControl(`${this.currentUserData.age}`),
    userName: new FormControl(`${this.currentUserData.userName!}`),
    country: new FormControl(`${this.currentUserData.country}`),
    city: new FormControl(`${this.currentUserData.city}`),
    phoneNumber: new FormControl(`${this.currentUserData.phoneNumber}`),
    userImg: new FormControl(""),
  })


  // separateDialCode = false;
  // SearchCountryField = SearchCountryField;
  // // TooltipLabel = TooltipLabel;
  // CountryISO = CountryISO;
  // preferredCountries: CountryISO[] = [
  //   CountryISO.UnitedStates,
  //   CountryISO.UnitedKingdom
  // ];


  constructor(public authService: AuthService, private _router: Router, public firestore: Firestore, public afs: AngularFirestore) {
  }

  ngOnInit(): void {
    const userProfileImg: any = document.querySelectorAll(".user-profile-img");
    userProfileImg.forEach((element: any) => {
      element.src = this.currentUserData.userImg
    });

    const profileName: any = document.querySelector(".profile-name");
    profileName.innerHTML = this.currentUserData.userName
    this.getData();
  }

  gohome() {
    this._router.navigate(['/home'])
  }

  getData() {
    const dbInstance = collection(this.firestore, 'users');
    getDocs(dbInstance)
      .then((res) => {
        this.users = [...res.docs.map((item) => {
          return { ...item.data(), id: item.id }
        })]
        this.users.filter((item: any) => {
          if (item.uid == this.currentUserId) {
            this.dataCurrentUser = item;
          }
        })
      })
  }

  openPopupImg(e: any) {
    const popupImg: any = document.querySelector(".img-popup");
    const settingPage: any = document.querySelector("#settings");
    popupImg.style.transform = "scale(1)";
    popupImg.style.opacity = "1";
    settingPage.style.height = "100vh";
    settingPage.style.overflow = "hidden";
  }
  closePopupImg(e: any) {
    const settingPage: any = document.querySelector("#settings");
    if (e.target.dataset.image == 'popup') {
      e.target.style.transform = "scale(0)"
      e.target.style.opacity = "0"
      settingPage.style.height = "auto";
      settingPage.style.overflow = "auto";
    }
  }

  openMenue() {
    const menu: any = document.querySelector(".menu");
    if (menu.classList.contains("no-active")) {
      menu.style.transform = "translate(10%, 60%) scaleY(1)"
      menu.classList.remove("no-active")
    } else {
      menu.style.transform = "translate(10%, 60%) scaleY(0)"
      menu.classList.add("no-active")
    }
  }

}
