import React, { useEffect } from 'react';
import './App.css';
import RoutesApp from './routes/RoutesApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000', {
  transports: ['websocket']
});

function App() {
  useEffect(() => {
    // Conectar ao WebSocket
    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // Escutar mensagens do canal 'task_updates'
    socket.on('task_updates', (data) => {
      console.log('Task updated:', data);
      // Atualizar o estado da aplicação ou mostrar uma notificação
    });

    // Limpar a conexão quando o componente é desmontado
    return () => {
      socket.disconnect();
    };
  });

  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <RoutesApp/>
    </div>
  );
}

export default App;
