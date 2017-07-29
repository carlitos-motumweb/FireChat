import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import {Mensaje} from '../interfaces/mensaje.interface';

@Injectable()
export class ChatService {
    usuario: any = {
        nombre: 'Carlos Augusto'
    }

    chats: FirebaseListObservable<any[]>;
    constructor(private db: AngularFireDatabase) {
        // this.chats = db.list('/chats');
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
            nombre: 'Carlos Augusto',
            mensaje: msj
        }

        return this.chats.push(mensaje);
    }

}
