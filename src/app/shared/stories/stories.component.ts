import { Component, OnInit, ViewEncapsulation } from '@angular/core';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Swiper, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

declare var $: any;

import data from './../../../json/data.json'


@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StoriesComponent implements OnInit {
  data: any = (data as any).default;
  stories: any = data.stories;

  slidesPerView: any = 2;
  config: SwiperOptions = {
    navigation: true,
    breakpoints: {
      1200: {
        slidesPerView: 6,
        spaceBetween: 5,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 5,
      },
      992: {
        slidesPerView: 4.4,
        spaceBetween: 5,
      },
      767: {
        slidesPerView: 4.4,
        spaceBetween: 5,
      },
      600: {
        slidesPerView: 5.4,
        spaceBetween: 5,
      },
      400: {
        slidesPerView: 4.4,
        spaceBetween: 5,
      },
      300: {
        slidesPerView: 3.4,
        spaceBetween: 5,
      },
    },
  };

  constructor() {
  }

  ngOnInit(): void {
  }
  popupImg(e: any) {
    let popup: any = document.querySelector(".popup")
    let popupImg: any = document.querySelector(".popup img")

    if (e.target.dataset.story != undefined) {
      console.log(popup);
      popup.style.opacity = `1`
      popup.style.transform = `scale(100%)`
      popupImg.src = `${e.target.dataset.story}`;
      console.log(popup.src);

      $(".story-time").animate({
        width: '0px',
      }, 10000)
      setTimeout(() => {
        popup.style.opacity = `0`
        popup.style.transform = `scale(0)`
      }, 10000)
    }
  }
  closePopup(e: any) {
    let popup: any = document.querySelector(".popup")
    if (e.target.dataset.popup != 'image') {
      popup.style.opacity = `0`
      popup.style.transform = `scale(0)`
    }
  }

}



let swiperDiscussions = new Swiper(".swiper-stories", {
  spaceBetween: 30,
  slidesPerGroup: 2,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: "#academics .swiper-button.next",
    prevEl: "#academics .swiper-button.prev"
  },
  breakpoints: {
    1114: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 2.9,
      spaceBetween: 15,
    },
    992: {
      slidesPerView: 2.5,
      spaceBetween: 15,
    },
    780: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    400: {
      slidesPerView: 1.5,
      spaceBetween: 15,
    },
    340: {
      slidesPerView: 1,
      spaceBetween: 15,
    },


  },
});
