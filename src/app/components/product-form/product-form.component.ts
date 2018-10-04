import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product = {} as Product;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit() {
  }

  createProduct() {
    console.log('Calling createProduct');
    console.log(this.product);
    // Dummy validation
    if ( this.product.name !== '' && this.product.description !== '' && this.product.price !== 0 )
      this.productService.createProduct(this.product);
    else
      console.log('Empty fields!!!');
    this.product = {} as Product;
  }



}
