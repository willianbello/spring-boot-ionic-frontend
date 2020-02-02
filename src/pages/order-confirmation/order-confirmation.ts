import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/domain/cart.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

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

  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService 
  ) {
    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService
      .findById(this.pedido.cliente.id)
      .subscribe(resposta => {
        this.cliente = resposta as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, resposta['enderecos']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      })
  }

  private findEndereco(id: string, list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() {
    return this.cartService.total();
  }

}
