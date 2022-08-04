import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sidebar :boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  toogleSidebar(){
    this.sidebar=!this.sidebar;
  }
}
