import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Echo from '@ably/laravel-echo';
import * as Ably from 'ably';

window.Ably = Ably;
window.Echo = new Echo({
    authEndpoint: "http://localhost/broadcasting/auth",
    broadcaster: 'ably',
});

window.Echo.connector.ably.connection.on((stateChange) => {
  console.log(stateChange);
    if (stateChange.current === 'connected') {
        console.log('connected to ably server');
    }
});

window.Echo.channel('test')
    .listen('.test', (e) => {
        console.log('Got event...');
        console.log(e);
    });
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
