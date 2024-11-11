
```markdown
# Real-Time Score Submission App

This project is a real-time score submission application built with React, Socket.io, and Node.js.
Users can submit their names and scores, which will be transmitted in real-time to the server.
The server then broadcasts the scores to all connected clients, allowing them to view an up-to-date scoreboard.

## Features

- **Real-time data transmission** using Socket.io.
- **Error handling and notifications** with `react-toastify`.
- **Duplicate submission prevention** to avoid redundant data.
- **Interactive UI** with a table that updates live with scores.

## Technologies Used

- **React**: Frontend framework
- **Socket.io**: WebSocket library for real-time communication
- **Node.js**: Server environment
- **React Toastify**: Toast notifications for feedback on submissions
- **CSS**: Basic styling

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager)

   ```
### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/score-submission-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd score-submission-app
   ```

3. **Install dependencies** for both the client and server:
   ```bash
   npm install
   ```

4. **Start the Socket.io server**:

   If you don’t have a server file yet, create a basic server setup to handle real-time events.

   - In the `server` folder (or in a new folder if not already created), create `index.js` with the following code:
     ```javascript
     const express = require('express');
     const http = require('http');
     const { Server } = require('socket.io');

     const app = express();
     const server = http.createServer(app);
     const io = new Server(server, {
       cors: {
         origin: "http://localhost:3000",
         methods: ["GET", "POST"]
       }
     });

     let scores = [];

     io.on('connection', (socket) => {
       console.log('a user connected');

       // Send scores to the client upon connection
       socket.emit('playerScores', scores);

       // Handle 'scores' event from the client
       socket.on('scores', (data) => {
         scores.push({ id: socket.id, ...data });
         io.emit('playerScores', scores); // Broadcast updated scores to all clients
       });

       socket.on('disconnect', () => {
         console.log('user disconnected');
       });
     });

     server.listen(3001, () => {
       console.log('Server listening on port 3001');
     });
     ```

   - Start the server with:
     ```bash
     node server/index.js
     ```

5. **Update the client-side code**: Ensure that the `socket` initialization in the client code (`App.tsx`) points to `http://localhost:3001`.

   ```javascript
   const socket = io('http://localhost:3001');
   ```

6. **Start the React client**:
   ```bash
   npm start
   ```

   The client should now be running at `http://localhost:3000`.

### Usage

1. **Submit Scores**:
   - Enter your name and score in the input fields.
   - Click "Send Scores" to submit.
   - If the score was submitted successfully, a success toast notification will appear.
   - If the score has already been submitted, an error toast will notify you.

2. **View Scoreboard**:
   - Scores from all users will appear in a table below the form.
   - The scoreboard will update in real-time as new scores are added.

### Preventing Duplicate Submissions

The application prevents the same data (same name and score) from being submitted multiple times by checking against already submitted scores. If an identical entry is detected, a notification will inform you of the duplication.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Issues and Contributions

If you encounter issues, please create a new issue in the repository. Contributions are welcome; feel free to submit a pull request!

---

**Happy Coding!**

```

### Key Points in the README:

- **Setup Instructions**: Step-by-step guide on installing dependencies and running both the client and server.
- **Usage Instructions**: How to use the form and interpret notifications.
- **Duplicate Prevention**: Explanation on how duplicates are handled.
- **Contact Information**: Information about where to raise issues or contribute.

This `README.md` will help new users understand how to set up, run, and use the application effectively.
