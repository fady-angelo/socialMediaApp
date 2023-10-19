import { Component, OnInit } from '@angular/core';
import data from 'src/json/data.json';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  data: any = (data as any).default;
  posts: any = data.posts;

  constructor() {
  }

  ngOnInit(): void {
  }
  changeReact(e: any) {
    let likeIcon: any = e.target.parentElement.parentElement.firstChild
    likeIcon.classList.replace(likeIcon.classList[1], e.target.classList[1])
  }

  displayComment(e: any) {
    e.target.parentElement.parentElement.parentElement.parentElement.children[2].style.transform = "scale(1)"
  }

  closeTextArea(e: any) {
    e.target.parentElement.parentElement.parentElement.children[2].style.transform = "scale(0)"
  }

  getPosts() {
    console.log();
  }



}
