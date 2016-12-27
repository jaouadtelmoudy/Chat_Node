// Connexion à socket.io
var socket = io.connect('http://localhost:8080');

var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('nouveau_client', pseudo);
document.title = pseudo + ' - ' + document.title;


socket.on('message', function(data) {
    insereMessage(data.pseudo, data.message,data.horaire);

})


socket.on('nouveau_client', function(pseudo) {
    $('#room_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
})


$('#formulaire_chat').submit(function () {
    var message = $('#message').val();
    socket.emit('message', message);

    //var dateTime="10:44";
    var dateTime=new Date();
    
    insereMessage(pseudo, message, dateTime);
    $('#message').val('').focus();
    return false;
});


function insereMessage(pseudo, message, dateTime) {
    $('#room_chat').prepend('<p><strong>' + pseudo + '</strong> <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+dateTime+'</small> : ' + message + '</p>');
}