import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  bar = false;

  constructor(public dataprovider:DataProvider,private authService:AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.dataprovider.loggedIn);
  }
  tooglebar(){
    console.log('tooglebar');
    this.bar=!this.bar;
  }
  signuOut(){
    this.authService.logout();
  }
}
