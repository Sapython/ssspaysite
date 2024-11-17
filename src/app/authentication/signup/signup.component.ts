import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.minLength(10),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.minLength(10),
    ]),
  });
  constructor(
    private authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService
  ) {}

  ngOnInit(): void {}

  signup() {
    if (this.signupForm.valid) {
      if (
        this.signupForm.value.password === this.signupForm.value.confirmPassword
      ) {
        this.authService.signUpWithEmailAndPassword(
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.signupForm.value.name
        );
      } else {
        this.alertify.presentToast('Passwords do not match','error');
      }
    } else {
      this.alertify.presentToast('Please fill all the fields correctly','info');
    }
  }
  googleSSO(){
    this.authService.signInWithGoogle();
  }
}
