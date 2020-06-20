import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/cart.service';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  removeItem(produto: ProdutoDTO): void{
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO): void{
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO): void{
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number{
    return this.cartService.total();
  }

  goOn(): void{
    this.navCtrl.setRoot('CategoriasPage');
  }

  loadImageUrls(): void{
    for(let i: number = 0; i < this.items.length; i++){
      let item: ProdutoDTO = this.items[i].produto;
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(
        response => 
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`,
        error => {}
      );
    }
  }

  ionViewDidLoad(): void {
    let cart: Cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }

}
