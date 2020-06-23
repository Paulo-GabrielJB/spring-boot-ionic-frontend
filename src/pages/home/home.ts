import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController, Loading } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    public authService: AuthService,
    public loadingCtrl: LoadingController) {

  }

  presentLoading(): Loading {
    let loader: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  login(): void {

    let loader: Loading = this.presentLoading();

    this.authService.authenticate(this.creds).subscribe(
      response => {
        this.authService.successfullLoogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
        loader.dismiss();
      }, error => { 
        loader.dismiss();
      }
    )
  }

  signup(): void {
    this.navCtrl.push('SignupPage');
  }

  ionViewWillEnter(): void {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave(): void {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(): void {
    this.authService.refreshToken().subscribe(
      response => {
        this.authService.successfullLoogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      }, error => { }
    )
  }

}
