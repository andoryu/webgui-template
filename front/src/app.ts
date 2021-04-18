import { Bridge } from "./bridge.js";
import { System, Canvas } from "./handlers.js";

// common app functions

declare var io: any;

var gBridge: Bridge;
var gSystem: System;
var gCanvas: Canvas;


window.addEventListener('load', function (event) {

    //temp open/close testing
    var element = document.getElementsByName("log-menu")[0];
    // alert(element.tagName);
    var aside_tag = document.getElementsByTagName('aside')[0];
    // alert(aside_tag.tagName);
    // alert(aside_tag.style.display);
    
    
    element.addEventListener("click", function () {
        // alert("clicked!")
        if(aside_tag.style.display === "none") {
            aside_tag.style.display = "block";
            resize_canvas();
        } else {
            aside_tag.style.display = "none";
            resize_canvas();
        }
       
    });

    gBridge = new Bridge(io);

    var log_el = document.getElementsByTagName("aside")[0] as HTMLElement;
    gSystem = new System(log_el);

    gBridge.register("sys", gSystem);

    gBridge.send_message("sys", "message via Bridge object");
    gBridge.send_message("sys", "message via Bridge object");
    gBridge.send_message("sys", "message via Bridge object");
    gBridge.send_message("sys", "message via Bridge object");
    gBridge.send_message("sys", "message via Bridge object");

    var canvas_el = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;
    gCanvas = new Canvas(canvas_el);

    resize_canvas();
    gCanvas.draw_line(20, 20, 1023, 767);

});


window.addEventListener('resize', function (event) {
        resize_canvas();
});


function resize_canvas() {
    var html_article = document.getElementById("article") as HTMLDivElement;
    var article_width = html_article.offsetWidth;
    var article_height = html_article.offsetHeight;

    console.log(article_width, article_height);

    var canvas_el = document.getElementsByTagName("canvas")[0] as HTMLCanvasElement;

    canvas_el.width = article_width - 15;
    canvas_el.height = article_height - 15;

    gSystem.log("Canvas width:  " + canvas_el.width);
    gSystem.log("Canvas height: " + canvas_el.height);
}
