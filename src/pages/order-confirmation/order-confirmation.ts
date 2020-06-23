import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { ClienteDTO } from '../../models/cliente.dto';
import { CartItem } from '../../models/cart-item';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/cart.service';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoService } from '../../services/domain/pedido.service';


@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService,
    public cartService: CartService,
    public pedidoService: PedidoService) {
    this.pedido = navParams.get('pedido');
  }

  checkout(): void {
    this.pedidoService.insert(this.pedido).subscribe(
      response => {
        console.log(response);
        this.cartService.createOrClearCart();
      },
      erro => {
        if(erro.status == 403)
          this.navCtrl.setRoot('HomePage');
      }
    );
  }

  back(): void{
    this.navCtrl.setRoot('CartPage');
  }

  total(): number{
    return this.cartService.total();
  }

  ionViewDidLoad(): void {
    this.clienteService.findById(this.pedido.cliente.id).subscribe(
      response => {
        this.cliente = response;
        this.endereco = this.cliente.enderecos.find(x => x.id == this.pedido.enderecoDeEntrega.id);
      },
      error => this.navCtrl.setRoot('HomePage')
    )
    this.cartItems = this.cartService.getCart().items;
  }

}
