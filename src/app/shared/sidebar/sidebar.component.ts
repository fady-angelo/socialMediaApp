import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  closeTheme(e: any) {
    if (e.target.firstChild.dataset.popup !== undefined) {
      e.target.style.transform = "scale(0)"
    }
  }

  openThemes() {
    let customizeTheme: any = document.querySelector(".customize-theme")
    customizeTheme.style.transform = "scale(100%)"
  }

  chooseFontsize(e: any) {
    let spanSizes: any = document.querySelectorAll(".choose-size span")
    let html: any = document.querySelector("html")
    spanSizes.forEach((size: any) => {
      size.classList.remove("active")
      let fontSizeHtml: string = '';
      if (e.target.classList.contains('font-size-1')) {
        fontSizeHtml = "10px"
      } else if (e.target.classList.contains('font-size-2')) {
        fontSizeHtml = "13px"
      } else if (e.target.classList.contains('font-size-3')) {
        fontSizeHtml = "16px"
      } else if (e.target.classList.contains('font-size-4')) {
        fontSizeHtml = "19px"
      } else if (e.target.classList.contains('font-size-5')) {
        fontSizeHtml = "22px"
      }
      html.style.fontSize = fontSizeHtml
    })
    e.target.classList.add("active")

  }
  changeColor(e: any) {
    let chooseColor: any = document.querySelectorAll(".choose-color span")
    let root: any = document.querySelector(":root")

    chooseColor.forEach((ele: any) => {
      ele.classList.remove("active")
    })

    let primaryHue: number = 252;
    if (e.target.classList.contains("color-1")) {
      primaryHue = 252;
    } else if (e.target.classList.contains("color-2")) {
      primaryHue = 52;
    } else if (e.target.classList.contains("color-3")) {
      primaryHue = 352;
    } else if (e.target.classList.contains("color-4")) {
      primaryHue = 152;
    } else if (e.target.classList.contains("color-5")) {
      primaryHue = 202;
    }
    e.target.classList.add('active')

    root.style.setProperty('--primary-color-hue', primaryHue)
  }

  changeBg(e: any) {
    let root: any = document.querySelector(":root")
    let chooseBgEle: any = document.querySelectorAll(".choose-bg > div")

    let lightColorLightness: string = '';
    let whiteColorLightness: string = '';
    let darkColorLightness: string = '';
    const changeBgAtt = () => {
      root.style.setProperty('--light-color-lightness', lightColorLightness)
      root.style.setProperty('--white-color-lightness', whiteColorLightness)
      root.style.setProperty('--dark-color-lightness', darkColorLightness)
    }
    chooseBgEle.forEach((ele: any) => {
      ele.classList.remove("active")
    })
    if (e.target.classList.contains("bg-1")) {
      darkColorLightness = '17%';
      whiteColorLightness = '100%';
      lightColorLightness = '95%';
      e.target.classList.add("active")
      changeBgAtt()
    } else if (e.target.classList.contains("bg-2")) {
      darkColorLightness = '95%';
      whiteColorLightness = '20%';
      lightColorLightness = '15%';
      e.target.classList.add("active")
      changeBgAtt()
    } else if (e.target.classList.contains("bg-3")) {
      darkColorLightness = '95%';
      whiteColorLightness = '10%';
      lightColorLightness = '0%';
      e.target.classList.add("active")
      changeBgAtt()
    }
  }

}
