// Connexion à socket.io
var socket = io.connect('http://localhost:8080');

/*
var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('nouveau_client', pseudo);
document.title = pseudo + ' - ' + document.title;
$('.first').hide();
*/
var  pseudo="";
$('#formulaire_login').submit(function (event) {
    event.preventDefault();
    var  pseudo=$('#pseudo').val();
    socket.emit('nouveau_client', pseudo);
    sessionStorage.setItem("pseudo",pseudo);
    $('#message').removeAttr("disabled");
    $('#message').focus();
    $('#envoi_message').removeAttr("disabled");
    $('.first').hide();
});


socket.on('message', function(data) {
    insereMessage(data.pseudo, data.message,data.horaire);
    $('.panel-body').animate({scrollTop : $('.panel-body').prop('scrollHeight')},500);
})


socket.on('nouveau_client', function(data) {
    $('#room_chat').prepend('<p><em>' + data.pseudo + ' a rejoint le Chat !</em></p>');
    $('#nbrUser').text(" [ "+ data.nbrUsers + " connecté(s) ]");
})



$('#formulaire_chat').submit(function (event) {
    event.preventDefault();
    var message = $('#message').val();
    socket.emit('message', message);
    $('#message').val('');
    $('#message').val('').focus();
});


function insereMessage(pseudo, message, dateTime) {
    $('#room_chat').append('<p><strong>' + pseudo + '</strong> <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>'+dateTime+'</small> : ' + message + '</p>');
}


function deconnexion(){
    socket.emit('decon', sessionStorage.getItem("pseudo"));
    sessionStorage.removeItem("pseudo");
    $('#message').attr("disabled","disabled");
    $('#envoi_message').attr("disabled","disabled");
    $('.first').show();
}