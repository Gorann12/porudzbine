import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class NarudzbineSocket {
  @WebSocketServer() server: Server;

  constructor() {}

  // @SubscribeMessage("promeniStatus")
  // promeniStatus(@MessageBody() data: string): string {
  //   this.server.emit("promeniStatus", "PROMENJENO")
  //   console.log("GOT SOME DATA", data);
  //   return data;
  // }
}
