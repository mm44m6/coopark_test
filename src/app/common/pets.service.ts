import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Pet } from '../common/pet';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private firestore: AngularFirestore) { }

  petCollection: AngularFirestoreCollection<Pet>;

  getPets(occurrenceType): Observable<any> {
    this.petCollection = this.firestore.collection<Pet>('pets',  ref => ref.where('occurrence', '==', occurrenceType));
    return this.petCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Pet;
          const id = a.payload.doc.id;
          console.log({ id, ...data });
          return { id, ...data };
      })
    ));
  }

  getPetById(id) {
    this.petCollection = this.firestore.collection<Pet>('pets');
    return this.petCollection.doc(id).valueChanges();
  }

  registerPet(document) { 
    this.firestore.doc(`pets/${this.firestore.createId()}`).set(document);
  }
  
}
