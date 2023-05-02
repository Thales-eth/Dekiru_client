import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import { StylesContextWrapper } from './contexts/styles.context';
import { AuthProviderWrapper } from './contexts/auth.context';
import { ErrorWrapper } from './contexts/error.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AuthProviderWrapper>
      <StylesContextWrapper>
        <ErrorWrapper>
          <App />
        </ErrorWrapper>
      </StylesContextWrapper>
    </AuthProviderWrapper>
  </Router>
);
