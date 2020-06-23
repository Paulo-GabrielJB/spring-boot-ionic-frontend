import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../models/local_user';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {


  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storageService: StorageService,
    public cartService: CartService) {
  }

  nextPage(endereco: EnderecoDTO): void{
    this.pedido.enderecoDeEntrega = {
      id: endereco.id
    };
    console.log(this.pedido);
  }

  ionViewDidLoad(): void {
    let localUser: LocalUser = this.storageService.getLocalUser();
    if(localUser && localUser.email)
      this.clienteService.findByEmail(localUser.email).subscribe(
        response => {
          this.items = response.enderecos;

          let cart: Cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response.id },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {
              return {
                quantidade: x.quantidade,
                produto: {
                  id: x.produto.id
                }
              }
            })
          }
        }, 
        error => {
          if(error.status == 403)
            this.navCtrl.setRoot('HomePage');
        });
    else
      this.navCtrl.setRoot('HomePage');
  }

}
