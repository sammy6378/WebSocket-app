import { useEffect, useState } from 'react';
import './App.css';
import { io } from 'socket.io-client';
import Input from './component/input';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [score, setScores] = useState<PlayerScore>({ id: '', name: '', score: '' });
  
  interface PlayerScore {
    id: string;
    name: string;
    score: string;
  }

  const [scores, getScores] = useState<PlayerScore[]>([]);
  const socket = io('localhost:3000');

  function connectSocket() {
    socket.on('connection', (socket) => {
      console.log("Connected", socket);
    });
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const currentObj = { [name]: value };
    setScores((prev) => ({ ...prev, ...currentObj }));
  }

  function sendScores(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check if the same data has already been submitted
    const isDuplicate = scores.some(
      (entry) => entry.name === score.name && entry.score === score.score
    );

    if (isDuplicate) {
      toast.error("Duplicate entry: this score has already been submitted.");
      return;
    }

    // Emit the data and update the scores state
    socket.emit('scores', score);

    // Success message on successful submission
    toast.success("Score submitted successfully!");

    socket.on('playerScores', (response) => {
      getScores(response);
    });

  }

  useEffect(() => {
    connectSocket();
  });

  return (
    <>
      <form className="form-wrapper" onSubmit={sendScores}>
        <Input name='name' placeholder='Enter your Name' handleInput={handleInput}  />
        <Input name='score' placeholder='Enter your Score' handleInput={handleInput} />
        <button type='submit' className='send-btn'>Send Scores</button>
      </form>

      <ToastContainer />  {/* Toast container to display notifications */}

      <div className="score-wrapper">
        <h1>Player Scores</h1>
        <table className="score-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr key={score.id}>
                <td>{score.id}</td>
                <td>{score.name}</td>
                <td>{score.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
