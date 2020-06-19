import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController) {
  }

  singupUser(event: Event) {
    event.preventDefault();
    console.log(event);
    return;
  }

  updateCidades() {
    return;
  }

}
