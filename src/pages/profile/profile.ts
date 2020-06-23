import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { LocalUser } from '../../models/local_user';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';
import { CameraOptions, Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageService: StorageService,
    public clienteService: ClienteService,
    public loadingCtrl: LoadingController,
    public camera: Camera) {
  }

  getImageIfExists(): void{
    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(
      response => this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`, 
    error => {});
  }

  presentLoading(): Loading {
    let loader: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  getCameraPicture(): void {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then(
      imageData => {
        this.picture = 'data:image/png;base64,' + imageData;
        this.cameraOn = false;
      },
      erro => {}
    )
  }

  ionViewDidLoad(): void {
    let localUser: LocalUser = this.storageService.getLocalUser();
    let loader: Loading = this.presentLoading();
    if(localUser && localUser.email)
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.cliente = response; 
          this.getImageIfExists();
          loader.dismiss();
        }, 
        error => {
          if(error.status == 403){
            this.navCtrl.setRoot('HomePage');
            loader.dismiss();
          }
        });
    else{
      loader.dismiss();
      this.navCtrl.setRoot('HomePage');
    }
  }
  
}
