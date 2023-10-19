import { Component, OnInit } from '@angular/core';
import data from 'src/json/data.json';

@Component({
  selector: 'app-reguests',
  templateUrl: './reguests.component.html',
  styleUrls: ['./reguests.component.scss']
})
export class ReguestsComponent implements OnInit {
  data: any = (data as any).default;
  requests: any = data.requests;
  reqOne: any = this.requests.slice(0, 5);
  reqTwo: any = this.requests.slice(5,);

  constructor() { }

  ngOnInit(): void {
    console.log(this.reqOne);
    console.log(this.reqTwo);
  }

  acceptFriend(e: any) {
    const userName = e.target.parentElement.parentElement.firstChild.lastChild;
    userName.innerHTML = `
    <div class="d-flex align-items-center">
      <p style="font-size: 0.8rem;" class="mb-0">${userName.innerHTML} is your friend now</p>
    </div>
    `
  }

  removeFriend(e: any) {
    const wrapper = e.target.parentElement.parentElement
    console.log(wrapper);
    wrapper.style.opacity = "0"
    setTimeout(() => {
      wrapper.style.display = "none"
      console.log("hi");

    }, 300)
  }

  seeMore(e: any) {
    let moreRequest: any = document.querySelector(".container-requests-more")
    if (e.target.innerHTML === 'See Less ...') {
      moreRequest.style.transform = "translateY(-120%)"
      e.target.innerHTML = 'See More ...'
    } else {
      moreRequest.style.transform = "translateY(0)"
      e.target.innerHTML = 'See Less ...'
    }

  }

}
