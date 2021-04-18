type Message = {
    command: string;
    data: string;
}

interface HandlerInterface {
    message(content: Message): any;
}


class System implements HandlerInterface {

    log_el: HTMLElement;

    public constructor(log_el: HTMLElement) {
        this.log_el = log_el;
    }

    //Handler Interface handler for inbound SocketIO messages
    public message(content: Message) {
        //process message type
        var command = content.command;
        var message = content.data;

        switch (command) {
            case "log": {
                this.log(message);
                break;
            }

            default: {
                this.log("Unknown command '$[command]'");
            }
        }
    }

    public log(logdata: string) {
        //todo: add timestamp
        this.log_el.insertAdjacentHTML('beforeend', logdata+"<br />");
    }
}

class Canvas {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    public draw_line(x1: number, y1: number, x2: number, y2: number) {
        if(this.context) {
            var ctx = this.context;

            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ff0000';

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }

}

export { HandlerInterface, Message }
export { System, Canvas }