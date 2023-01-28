const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const clients = new Map()
let idCounter = 0

function Client(id, name) {
    this.id = id
    this.name = name
}

const port = 3000

// use to serve resource to clients
app.use(express.static(__dirname + '\\public'));
app.use('/file',express.static(__dirname + '\\node_modules'));
console.log(__dirname + '\\node_modules\\three\\build')


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('login', (name) => {
        let client = new Client(idCounter++, name)
        clients.set(socket, client)
        console.log(`client ${client.id} is connected`)
        printClientsNumber()
    })

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg, clients.get(socket).name);
    });

    socket.on('disconnect', () => {
        try {
            if (clients.has(socket)) {
                console.log(`user ${clients.get(socket).id} disconnected`);
                clients.delete(socket)
                printClientsNumber()
            } else {
                console.log("anonymous player left")
            }

        } catch (e) {
            console.error(e)
        }
    });
});

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

function printClientsNumber() {
    console.log(`${clients.size} players connected`)
    console.log(...clients.values())
}

