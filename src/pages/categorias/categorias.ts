import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items : CategoriaDTO[];
  bucketUrl : string = API_CONFIG.bucketBaseUrl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private categoriaService: CategoriaService,
    public loadingCtrl: LoadingController) {
  }


  presentLoading(): Loading {
    let loader: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  showProdutos(codigoCategoria: string): void{
    this.navCtrl.push('ProdutosPage', { codigoCategoria });
  }

  ionViewDidLoad(): void {
    let loader: Loading = this.presentLoading();
    this.categoriaService.findAll().subscribe(response => {
      this.items = response;
      loader.dismiss();
    }, error => {
      loader.dismiss();
    });
  }

}
