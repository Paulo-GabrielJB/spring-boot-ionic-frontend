import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({
        nome: ['Test', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['teste@gmail.com', [Validators.required, Validators.email]],
        tipoCliente: ['0', [Validators.required]],
        cpfOuCnpj: ['71213638011', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['123', [Validators.required]],
        logradouro: ['Rua a', [Validators.required]],
        numero: ['25', [Validators.required]],
        complemento: ['Casa 4', []],
        bairro: ['Qualquer', []],
        cep: ['45871144', [Validators.required]],
        telefone1: ['11955555555', [Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        codigoEstado: [null, [Validators.required]],
        codigoCidade: [null, [Validators.required]]
      });

  }

  singupUser(event: Event): void {
    event.preventDefault();
    this.clienteService.insert(this.formGroup.value).subscribe(
      response => 
        this.showInsertOk()
      ,
       error => {}
    )
    return;
  }

  showInsertOk(): void {
    let alert: Alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  updateCidades(): void {
    let codigoEstado: string = this.formGroup.value.codigoEstado;
    this.cidadeService.findAll(codigoEstado).subscribe(
      response => {
        this.cidades = response;
        this.formGroup.controls.codigoCidade.setValue(null);
      },
      error => {}
    );
  }

  ionViewDidLoad(): void{
    this.estadoService.findAll().subscribe(
      response => {
        this.estados = response;
        this.formGroup.controls.codigoEstado.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {}
    );
  }

}
