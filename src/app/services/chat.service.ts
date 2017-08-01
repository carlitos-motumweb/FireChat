import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Mensaje} from '../interfaces/mensaje.interface';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
  usuario: any = {}

  chats: FirebaseListObservable<any[]>;
  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    if (localStorage.getItem('usuario')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'))
    } else {
      this.usuario = null;
    }
  }

  cargarMensajes() {
    this.chats = this.db.list('/chats', {
      query: {
        limitToLast: 20,
        orderByKey: true
      }
    });

    return this.chats;
  }

  agregarMensaje(msj: string) {
    const mensaje: Mensaje = {
      nombre: this.usuario.displayName,
      mensaje: msj,
      uid: this.usuario.uid
    }

    return this.chats.push(mensaje);
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(result => {
          console.log(result);
          console.log(result.user);
          this.usuario = result.user;
          localStorage.setItem('usuario', JSON.stringify(result.user));
        })
        .catch(error => console.log(error));
    } else {
    }
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuario = null;
    firebase.auth().signOut().then(function() {
      console.log('logout...')
    }, function(error) {
      console.log('Error logout...')
    });
  }
}
