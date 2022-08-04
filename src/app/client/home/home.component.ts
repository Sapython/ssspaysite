import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bar = false;

  constructor() { }

  ngOnInit(): void {
  }
  tooglebar(){
    console.log('tooglebar');
    this.bar=!this.bar;
  }
}
