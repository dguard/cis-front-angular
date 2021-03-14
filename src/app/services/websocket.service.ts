import {Injectable} from '@angular/core';

let messageCallbackFn = null;

@Injectable()
export class WebsocketService {

  protected socket;

  constructor() {
    const websocket = new WebSocket('ws://127.0.0.1:8765/');
    console.log('connecting to websocket');

    websocket.onmessage = (event) => {
      messageCallbackFn && messageCallbackFn(event);
    };
    this.socket = websocket;
  }

  waitForOpenConnection = (socket) => {
    return new Promise((resolve, reject) => {
      const maxNumberOfAttempts = 10;
      const intervalTime = 200;

      let currentAttempt = 0;
      const interval = setInterval(() => {
        if (currentAttempt > maxNumberOfAttempts - 1) {
          clearInterval(interval);
          reject(new Error('Maximum number of attempts exceeded'))
        } else if (socket.readyState === socket.OPEN) {
          clearInterval(interval);
          resolve();
        }
        currentAttempt++;
      }, intervalTime);
    });
  };

  sendMessage = async (msg) => {
    if (this.socket.readyState !== this.socket.OPEN) {
      try {
        await this.waitForOpenConnection(this.socket);
        this.socket.send(msg)
      } catch (err) { console.error(err); }
    } else {
      this.socket.send(msg);
    }
  };

  registerMessageCallbackFn = (fn) => {
    messageCallbackFn = fn;
  }

}
