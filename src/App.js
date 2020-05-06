import React, { Suspense, lazy } from 'react';
import logo from './logo.svg';
import './App.css';
//imp,imd

import { BrowserRouter as Router } from 'react-router-dom'
import store from './store/store'
import {Provider} from 'react-redux'
// import Header from './common/Header'

const Header = lazy(() => import('./common/Header'))
// import Switch from './common/Switch'
const Switch = lazy(() => import('./common/Switch'));

function App() {
  return (
    // <ErrorBoundary>
    <Provider store={store}>
    
    <Suspense fallback={
      <div>Loading...</div>
    }
    >
      <Router>
        <div className="App">
          <Header />
        </div>
        <Switch />
      </Router>
    </Suspense>
    </Provider>
    // </ErrorBoundary>

  );
}

export default React.memo(App);
