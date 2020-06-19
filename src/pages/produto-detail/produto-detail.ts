import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';


@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProdutoDTO = {
    id: "1",
    nome: "Cadeira",
    preco: 100.0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad ProdutoDetailPage');
  }

}
