import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { BrowserRouter} from 'react-router-dom';
import {I18nextProvider} from "react-i18next"
import i18next from 'i18next';
import global_es from "./translations/es/global.json";
import global_en from "./translations/en/global.json";
import "./css/ScrollbarStyles.css"
i18next.init({
  interpolation:{escapeValue:false},
  lng:"es",
  resources:{
    es:{
      global:global_es
    },
    en:{
      global:global_en
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider  i18n={i18next}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);