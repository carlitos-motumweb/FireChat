import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  mensaje = '';
  elemento: any;

  constructor(private _chatSRV: ChatService) {
    this._chatSRV.cargarMensajes().subscribe(
      (resp) => {
        console.log('Mensajes Cargados: ' + resp.length);
        setTimeout(() => this.elemento.scrollTop = this.elemento.scrollHeight, 100);
      }
    );
  }

  ngOnInit() {
      this.elemento = document.getElementById('app-mensajes');
  }


  enviar() {
    if (this.mensaje.length === 0) {
      return;
    }
    console.log('Enviando mensaje...')
    console.log(this.mensaje);

    this._chatSRV.agregarMensaje(this.mensaje)
      .then(() => {
        console.log('Exito');
        this.mensaje = '';
      })
      .catch(error => { console.error('Error: ' + error) })
  }

}
