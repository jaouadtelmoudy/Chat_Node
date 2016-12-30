var exp=require("express");
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');


app.use(exp.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});
var users=[];
io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        users.push(ent.encode(pseudo));
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        io.sockets.emit('nouveau_client', {pseudo:pseudo,nbrUsers:users.length,users:users});
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);

        var current_hour = new Date();
        var h=current_hour.getHours();
        var m=current_hour.getMinutes();
        var s=current_hour.getSeconds()

        //socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message, horaire:h+':'+m+' - '+s});
        io.sockets.emit('message', {pseudo: socket.pseudo, message: message, horaire:h+':'+m+' - '+s});
    });

});

server.listen(8080);



