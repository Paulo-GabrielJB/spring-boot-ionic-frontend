import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, Refresher, InfiniteScroll } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[] = [];
  private pageNumber: number = 0;
  private totalPages: number = 1;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  loadImageUrls(start: number, end: number): void {
    for (let i: number = start; i <= end; i++) {
      let item: ProdutoDTO = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(
          response =>
            item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`,
          error => { }
        );
    }
  }

  showDetail(codigoProduto: string): void {
    this.navCtrl.push('ProdutoDetailPage', { codigoProduto });
  }

  presentLoading(): Loading {
    let loader: Loading = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  loadData(): void {
    if (this.pageNumber < this.totalPages){
      let loader: Loading = this.presentLoading();
      this.produtoService.findByCategoria(this.navParams.get('codigoCategoria'), this.pageNumber++, 10).subscribe(
        response => {
          let start = this.items.length;
          this.items.push(...response['content']);
          this.totalPages = response['totalPages'];
          this.loadImageUrls(start, this.items.length - 1);
          loader.dismiss();
        },
        error => {
          loader.dismiss();
        }
      );
    }
      
  }

  doRefresh(event: Refresher): void {
    this.items = [];
    this.pageNumber = 0;
    this.totalPages = 1;
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 500);
  }

  doInfinite(event: InfiniteScroll): void {
    setTimeout(() => {
      this.loadData();
      event.complete();
    }, 500);
  }

  ionViewDidLoad(): void {
    this.loadData();
  }

}
