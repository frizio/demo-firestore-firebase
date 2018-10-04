import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection;
  products: Observable<Product[]>;
  productDoc;

  constructor(
    public db: AngularFirestore
  ) { 
    //this.products = this.db.collection('products').valueChanges();
    this.productsCollection = this.db.collection('products');
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          data.id = action.payload.doc.id;
          return data;
        })
      })
    );
  }

  getProducts() {
    return this.products;
  }

}
