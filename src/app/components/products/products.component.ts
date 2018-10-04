import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;  
    } )
  }

  deleteProduct(event, product) {
    //console.log('Delete product ' + product.name);
    //console.log(product);
    
  }

}
