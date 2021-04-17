import {Fred} from "./fred.js";

// common app functions

declare var io: any;


window.addEventListener('load', function (event) {

    var f = new Fred("Nurk");

    console.log(f.name);


    var element = document.getElementsByName("log-menu")[0];
    // alert(element.tagName);
    var aside_tag = document.getElementsByTagName('aside')[0];
    // alert(aside_tag.tagName);
    // alert(aside_tag.style.display);
    
    
    element.addEventListener("click", function () {
        // alert("clicked!")
        if(aside_tag.style.display === "none") {
            aside_tag.style.display = "block";
        } else {
            aside_tag.style.display = "none";
        }
        
    });

    const socket = io("ws://localhost:5000");

    socket.on("connect", () => {
        console.log("socket on connect!")
        socket.emit("sys", "Hello!");
        socket.emit("app", "Gnarly, dude...");
      });

    socket.on("sys", (data: string) => {
        console.log("sys: " + data);
    })

});
