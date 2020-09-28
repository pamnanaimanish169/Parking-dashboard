import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { CookieService } from 'ngx-cookie';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
import { WindowService } from './window.service';

export class PhoneNumber {
  countryCode:string = '91';
  number: string;

  get e164() {
    const num = this.countryCode + this.number;
    return `+${num}`
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  windowRef: any;

  phoneNumber = new PhoneNumber();

  verificationCode: string;

  user: any;

  buttonClicked = false;
  constructor(private win: WindowService, private toastrService: ToastrService, private router: Router, private cookieService: CookieService) {}

  ngOnInit() {
    firebase.initializeApp(environment.firebase)
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier.render()
  }

  sendLoginCode() {  
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    console.log('Num', num);
    console.log('typeof Num', typeof num)

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      this.buttonClicked = true;
      return firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log('Error in Signing In' , error))
    })
    .catch((error) => {
      console.log('Error is setting Perisitence', error)
    })
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
    .confirm(this.verificationCode)
    .then(result => {
      this.user = result.user;
      this.cookieService.put('currentUser',this.user.phoneNumber)
      this.router.navigateByUrl('/vendor')
    })
    .catch(error=>{
      console.log(error, "Incorrect code enetered?")
      this.toastrService.error('Incorrect code enetered?')
    })
  }

  getValue(event) {
    console.log(event)
    console.log(this.phoneNumber)
    console.log(this.phoneNumber)
    console.log(this.phoneNumber.e164)
  }

}
