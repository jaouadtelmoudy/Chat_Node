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


$('#formulaire_chat').submit(function (event) {
    event.preventDefault();
    var message = $('#message').val();
    socket.emit('message', message);
    $('#message').val('');
    $('#message').val('').focus();
});


function insereMessage(pseudo, message, dateTime) {
    $('#room_chat').prepend('<p><strong>' + pseudo + '</strong> <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+dateTime+'</small> : ' + message + '</p>');
}