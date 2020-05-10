import React, { Suspense, lazy, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
//imp,imd

import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store'
import { Provider } from 'react-redux'
import './i18n';
import { useTranslation } from 'react-i18next';
import { isNull, isUndefined, isEmpty, isNaN } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
// import Header from './common/Header'

const Header = lazy(() => import('./common/Header'))
// import Switch from './common/Switch'
const Switch = lazy(() => import('./common/Switch'));




function App() {

  const { t, i18n } = useTranslation();

  function handleChangeLanguage(language) {
    i18n.changeLanguage(language)
  }

  return (
    // <ErrorBoundary>
    <Provider store={store}>

      <Suspense fallback={
        <div>...loading</div>
      }
      >
        <Router>
          <div className="App">
            <Header handleChangeLanguage={handleChangeLanguage} />
          </div>
          <Switch />
        </Router>
      </Suspense>
    </Provider>
    // </ErrorBoundary>

  );
}

export default App;
