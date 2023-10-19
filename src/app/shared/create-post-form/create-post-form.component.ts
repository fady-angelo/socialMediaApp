import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import data from './../../../json/data.json';


@Component({
  selector: 'app-create-post-form',
  templateUrl: './create-post-form.component.html',
  styleUrls: ['./create-post-form.component.scss']
})
export class CreatePostFormComponent implements OnInit {
  createForm: FormGroup = new FormGroup({
    userName: new FormControl("Rimon"),
    userImg: new FormControl("./../../../assets/personal.jpg"),
    image: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    likes: new FormControl("0"),
    comments: new FormControl("0"),
  });

  data: any = (data as any).default;
  posts: any = data.posts;

  textArea: string = '';
  isEmojiPickerVisible: boolean = false;

  base64: any = '';

  constructor() { }

  ngOnInit(): void {
  }

  addEmoji(event: any) {
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }


  getImgPath(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
      this.createForm.get('image')?.setValue(this.base64);
      console.log(this.base64);

    }
  }


  createPost(e: any) {
  }

  createBtn() {
    const model = this.createForm.value;
    console.log(this.createForm);
    console.log(model);
    console.log(this.base64);


    this.posts.unshift(
      {
        "userName": `${model.userName}`,
        "userImg": `${model.userImg}`,
        "image": `${model.image}`,
        "description": `${model.description}`,
        "likes": `${model.likes}`,
        "comments": `${model.comments}`
      }
    );
  }


}
