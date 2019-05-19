const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.Port || 3334;

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index-test.html");
});

http.listen(port, function () {
    console.log("Listening on port :" + port);
});

io.sockets.on('connection', function (socket) {
    socket.on("user_join", function(data){
        this.username = data;
        console.log(data);
        socket.emit("user_join",data);
    });
    
    socket.on("chat_message", function(data){
        data.username = this.username;
        console.log(data);
        socket.emit("chat_message" , data)
    });

    socket.on('disconnect', function() {
        socket.emit("user_left",  this.username);
        io.sockets.emit('user_left',  this.username);
    });
});

