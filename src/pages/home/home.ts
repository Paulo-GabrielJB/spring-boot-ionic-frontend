import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credencias.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  creds: CredenciaisDTO = { 
    email: '', 
    senha: ''
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public authService: AuthService) {

  }

  login(){
    this.authService.authenticate(this.creds).subscribe(
      response => {
        this.authService.successfullLoogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => {}
    )
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

 ionViewWillEnter(){
   this.menu.swipeEnable(false);
 }

 ionViewDidLeave(){
   this.menu.swipeEnable(true);
 }

 ionViewDidEnter(){
  this.authService.refreshToken().subscribe(
    response => {
      this.authService.successfullLoogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, error => {}
  )
 }

}
