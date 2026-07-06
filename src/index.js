// Import React library
import React from 'react';

// Import ReactDOM to display React app inside the browser
import ReactDOM from 'react-dom/client';

// Import global CSS (applies to the whole application)
import './index.css';

// Import the main App component
import App from './App';

// Find <div id="root"></div> from public/index.html
// and create a React root inside it
const root = ReactDOM.createRoot(
  document.getElementById('root')
);

// Render (display) the App component inside the root div
root.render(

  // StrictMode helps detect potential problems during development
  <React.StrictMode>

    {/* Main component of the application */}
    <App />

  </React.StrictMode>

);