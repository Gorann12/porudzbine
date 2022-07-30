import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

export enum SocketEvents {}

@Injectable({
  providedIn: 'root'
})

export class SocketService {

  constructor(private socket: Socket) { }

  emituj(msg: string) {
    this.socket.emit('promeniStatus', msg, (data: any) => {
      console.log("ACKNOWLEDGEMENT", data);
    });
  }

  slusajEvent() {
    return this.socket.fromEvent("promeniStatus");
  }
}
