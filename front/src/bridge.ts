import { HandlerInterface } from "./handlers.js"

declare var io: any;

export class Bridge {

    socket: any;
    handlers: Record<string, HandlerInterface>;

    public constructor(io: any) {

        this.socket = io("ws://localhost:5000");
        this.handlers = {};

        this.register_sockets();

    }

    private register_sockets() {

        this.socket.onAny( (event: string, ...args: any[])=> {

            switch(event) {
                case "connect": {
                    console.log("socket connected!");
                    break;
                }
                default: {
                    if(event in this.handlers){
                        var handler = this.handlers[event];
                        handler.message(args[0]);
                    } else {
                        console.log("No handler for message type '$[event]'.");
                    }                    
                }
            }

        });
    }

    public register(endpoint: string, handler: HandlerInterface) {
        this.handlers[endpoint]  = handler;
    }

    public send_message(endpoint: string, message: string) {
        this.socket.emit(endpoint, message);
    }

}