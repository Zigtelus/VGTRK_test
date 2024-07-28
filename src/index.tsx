// modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// redux
import { setupStore } from './redux/store';

// styles
import './styles/index.scss';

// main code

const store = setupStore();
const contain = document.getElementById('root');
const root = ReactDOM.createRoot(contain);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
