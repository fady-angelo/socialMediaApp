import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUserData: any = JSON.parse(localStorage.getItem('currentUserData')!)
  userProfileImg: any = this.currentUserData.userImg
  isLogin: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    const profileImg: any = document.getElementById("profile-img");
    profileImg.src = this.userProfileImg
  }
  openSettings(e: any) {
    let settings: any = document.querySelector(".settings")
    if (settings.classList.contains("active")) {
      settings.style.opacity = "0";
      setTimeout(() => {
        settings.style.display = "none";
      }, 300)
      settings.classList.remove("active")
    } else {
      settings.style.display = "block";
      setTimeout(() => {
        settings.style.opacity = "1";
      })
      settings.classList.add("active")
    }

  }

  fireLogOut() {
    // this._auth.logOut()
  }

}
