import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterPetService {

  constructor(private firestore: AngularFirestore) { }

  async createDocument(document) {
    this.firestore.doc(`pets/${this.firestore.createId()}`).set(document);
  }
}
