import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalUser } from '../../models/local_user';
import { StorageService } from '../../services/store.service';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageService: StorageService) {
  }

  ionViewDidLoad() {
    let localUser: LocalUser = this.storageService.getLocalUser();

    if(localStorage && localUser.email)
      this.email = localUser.email;

  }

}
