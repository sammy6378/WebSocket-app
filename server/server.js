import { createServer } from 'http';
import { Server } from 'socket.io';


const httpServer = createServer();

const io = new Server(httpServer, { cors: { origin: '*' } });

let playerScores = [];



io.on("connection", (socket) => {
    
    
    socket.on("scores", (scores) => {
        // add in an array of scores to the playerScores array
        playerScores.push({...scores, id: socket.id  });
        console.log("Player Scores",playerScores);

        socket.emit("playerScores", playerScores);

        setInterval(()=>{
            // Emit the latest scores to all connected clients
            socket.emit("playerScores", playerScores);
        },5000)
    })

});





httpServer.listen(3000, () => {
    console.log('Server is running on port 3000');
})