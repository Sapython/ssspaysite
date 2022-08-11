import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
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
