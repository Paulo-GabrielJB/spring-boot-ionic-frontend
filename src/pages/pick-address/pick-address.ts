import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {


  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        logradouro: "Rua A",
        numero: "840",
        complemento: "",
        bairro: "Centro",
        cep: "45896321",
        cidade: {
          id: "1",
          nome: "São Paulo",
          estado: {
            id: "1",
            nome: "São Paulo"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua B",
        numero: "830",
        complemento: "",
        bairro: "Centro",
        cep: "45896321",
        cidade: {
          id: "1",
          nome: "São Paulo",
          estado: {
            id: "1",
            nome: "São Paulo"
          }
        }
      }
    ]
  }

}
