import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'social-media';
  showSidebar = true;
  constructor(public authService: AuthService, private router: Router) {
    console.log(location.href.includes("setting"));

  }
  ngOnInit(): void {
    this.router.events.subscribe(val => {
      // if (location.hash != "#/setting" && location.hash != "#/setting/account" && location.hash != "#/setting/notification" && location.hash != "#/setting/securety") {
      if (location.href.includes("setting")) {
        this.showSidebar = false;
      } else {
        this.showSidebar = true;
      }
    });
    const routerOutlit: any = document.querySelector(".router-outlit")
  }
}
