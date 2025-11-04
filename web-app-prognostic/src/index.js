import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./assets/style/style.css"
import AppRoutes from './routes/AppRoutes';  // Make sure to import the correct component for routing
import { Provider } from 'react-redux';
import { store, persistor } from './store'; // Correct import for store and persistor
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppRoutes />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
