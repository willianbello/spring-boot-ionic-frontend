import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];

  bucketBaseUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService
  ) {}

  ionViewDidLoad() {

    let categoria_id = this.navParams.get('categoria_id');

    this.produtoService
      .findByCategoria(categoria_id)
      .subscribe(resposta => {
        this.items = resposta['content'];
        this.loadImageUrls();
      },
      error => {});
  }

  loadImageUrls() {
    for(let i = 0; i < this.items.length; i ++) {
      let item = this.items[i];
      this.produtoService
        .getSmallImageFromBucket(item.id)
        .subscribe(resposta => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }

  showDetail() {
    this.navCtrl.push('ProdutoDetailPage');
  }

}
