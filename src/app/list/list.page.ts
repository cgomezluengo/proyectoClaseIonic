import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from '../services/firestore/firestore.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public deseos = [];
  public documentId = null;
  public currentStatus = 1;
  public newDeseoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    id: new FormControl('')
  });
  constructor(private firestoreService: FirestoreService) { 
    this.newDeseoForm.setValue({
      id: '',
      nombre: '',
      url: ''
    });

  }

  ngOnInit() {
    this.firestoreService.getDeseos().subscribe((deseosSnapshot) => {
    this.deseos = [];
    deseosSnapshot.forEach((deseosData: any) => {
      this.deseos.push({
        id: deseosData.payload.doc.id,
        data: deseosData.payload.doc.data()
      });
    })
  });
  }

  // public newDeseo(form, documentId = this.documentId) {
  //   console.log(`Status: ${this.currentStatus}`);
  //   if (this.currentStatus == 1) {
  //     let data = {
  //       nombre: form.nombre,
  //       url: form.url
  //     }
  //     this.firestoreService.createDeseo(data).then(() => {
  //       console.log('Documento creado exitósamente!');
  //       this.newDeseoForm.setValue({
  //         nombre: '',
  //         url: '',
  //         id: ''
  //       });
  //     }, (error) => {
  //       console.error(error);
  //     });
  //   } else {
  //     let data = {
  //       nombre: form.nombre,
  //       url: form.url
  //     }
  //     this.firestoreService.updateDeseo(documentId, data).then(() => {
  //       this.currentStatus = 1;
  //       this.newDeseoForm.setValue({
  //         nombre: '',
  //         url: '',
  //         id: ''
  //       });
  //       console.log('Documento editado exitósamente');
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   }
  // }

  // public editDeseo(documentId,nomb,urll) {
  //   let editSubscribe = this.firestoreService.getDeseo(documentId).subscribe((cat) => {
  //     this.currentStatus = 2;
  //     this.documentId = documentId;
  //     this.newDeseoForm.setValue({
  //       id: documentId,
  //       nombre: nomb,
  //       url: urll
  //     });
  //     editSubscribe.unsubscribe();
  //   });
  // }

  // // public editDeseo(documentId,nomb,urll) {
  // //   let data = {
  // //     nombre: nomb,
  // //     url: urll,
  // //     id: documentId
  // //   }
  // //   console.log(documentId)
  // //   console.log(nomb)
  // //   console.log(urll)
  // //  // this.newDeseoForm.get('nombre').setValue(nomb);
  // //   this.newDeseoForm.setValue({
  // //     nombre: nomb,
  // //     url: urll,
  // //     id: documentId
  // //   });
  // // }


  // public deleteDeseo(documentId) {
  //   this.firestoreService.deleteDeseo(documentId)
  // }
}
