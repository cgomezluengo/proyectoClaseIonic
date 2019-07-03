import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore:AngularFirestore) {
    
  }

    //Crea un nuevo deseo
 public createDeseo(data: {nombre: string, url: string}) {
   return this.firestore.collection('deseo').add(data);
 }
 //Obtiene un deseo
 public getDeseo(documentId: string) {
   return this.firestore.collection('deseo').doc(documentId).snapshotChanges();
 }
 //Obtiene todos los deseos
 public getDeseos() {
   return this.firestore.collection('deseo').snapshotChanges();
 }
 //Actualiza un deseo
 public updateDeseo(documentId: string, data: any) {
   return this.firestore.collection('deseo').doc(documentId).set(data);
 }

 public deleteDeseo(documentId: string) {
   this.firestore.collection('deseo').doc(documentId).delete().then(function() {
     console.log("Document successfully deleted!");
 }).catch(function(error) {
     console.error("Error removing document: ", error);
 });
 }
}
