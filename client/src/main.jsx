import React from 'react';
import { createRoot } from 'react-dom/client';
import Signup from './Signup.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><Signup /></React.StrictMode>
);
