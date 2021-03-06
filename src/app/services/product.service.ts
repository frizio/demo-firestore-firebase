import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDocument: AngularFirestoreDocument<Product>;

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


  createProduct(product: Product) {
    this.productsCollection.add(product);
  }

  deleteProduct(product: Product) {
    this.productDocument = this.db.doc(`products/${product.id}`);
    this.productDocument.delete();
  }

  updateProduct(product: Product) {
    this.productDocument = this.db.doc(`products/${product.id}`);
    this.productDocument.update(product);
  }


}
