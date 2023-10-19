import { Component, OnInit } from '@angular/core';
import data from 'src/json/data.json';

@Component({
  selector: 'app-requests-page',
  templateUrl: './requests-page.component.html',
  styleUrls: ['./requests-page.component.scss']
})
export class RequestsPageComponent implements OnInit {
  data: any = (data as any).default;
  requests: any = data.requests;

  constructor() { }

  ngOnInit(): void {
    console.log(this.requests);
  }

  acceptFriend(e: any) {
    const content = e.target.parentElement.parentElement.parentElement.firstChild.lastChild;
    const btns = e.target.parentElement.parentElement.parentElement.lastChild;
    content.innerHTML = `${content.firstChild.innerHTML} is your friend now`
    btns.style.display = "none"
  }

  removeFriend(e: any) {
    const wrapper = e.target.parentElement.parentElement.parentElement;
    wrapper.style.opacity = "0"
    setTimeout(() => {
      wrapper.style.display = "none"
    }, 300)
  }

}
