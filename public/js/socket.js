var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
let logged = false

form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (logged) {
        if (input.value) {
            socket.emit('chat message', input.value);
            resetInput()
        }
    } else {
        if (input.value) {
            socket.emit('login', input.value);
            logged = true
            resetInput()
        }
    }
});

socket.on('chat message', function(msg, id) {
    var item = document.createElement('li');
    item.textContent = id + " : " + msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

function resetInput() {
    input.value = '';
}