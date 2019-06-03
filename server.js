const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3334;

app.use(express.static(__dirname));

// app.get("/", function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// });
// app.get("/index.css", function(req, res) {
//     res.sendFile(__dirname + "/index.css");
// });
io.on("connection", function (socket) {

    socket.on("user_join", function (data) {
        this.username = data;
        console.log(data);
        socket.broadcast.emit("user_join", data);
    });

    socket.on("chat_message", function (data) {
        data.username = this.username;
        console.log(data)
        socket.broadcast.emit("chat_message", data);
    });

    socket.on("disconnect", function (data) {
        console.log(data)
        socket.broadcast.emit("user_leave", this.username);
    });
});
http.listen(port, function () {
    console.log("Listening on *:" + port);
});