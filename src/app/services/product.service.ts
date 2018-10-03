import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection;
  products: Observable<Product[]>;
  productDoc;

  constructor(
    private db: AngularFirestore
  ) { 
    this.products = this.db.collection('products').valueChanges();
  }

  getProduct() {
    return this.products;
  }

}
