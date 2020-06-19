import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        nome: ['Teste', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['teste@gmail.com', [Validators.required, Validators.email]],
        tipo: ['1', [Validators.required]],
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

  singupUser(event: Event) {
    event.preventDefault();
    console.log(event);
    return;
  }

  updateCidades() {
    return;
  }

}
