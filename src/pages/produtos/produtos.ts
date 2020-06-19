import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad(): void {
    this.produtoService.findByCategoria(this.navParams.get('codigoCategoria')).subscribe(
      response => {
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => { }
    );
  }

  loadImageUrls(): void{
    for(let i: number = 0; i < this.items.length; i++){
      let item: ProdutoDTO = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(
        response => 
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`,
        error => {}
      );
    }
  }

  showDetail(): void{
    this.navCtrl.push('ProdutoDetailPage');
  }

}
