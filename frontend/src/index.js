import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider> 
        <App />
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>
);
