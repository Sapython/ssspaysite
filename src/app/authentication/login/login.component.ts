import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.minLength(10),
    ]),
  });
  checked:boolean = false;
  constructor(private authService:AuthenticationService,private alertify: AlertsAndNotificationsService,public dataProvider:DataProvider) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user)=>{
      this.checked = true;
    })
  }
  login(){
    if (this.loginForm.valid) {
      this.authService.loginEmailPassword(
        this.loginForm.value.email,
        this.loginForm.value.password,
      );
    } else {
      this.alertify.presentToast('Please fill all the fields correctly','info');
    }
  }
  googleSSO(){
    this.authService.signInWithGoogle();
  }
}
