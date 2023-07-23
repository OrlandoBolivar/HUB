import React, { useEffect } from 'react';
import reducers from './utils/reducers.js'
import SignInMember from './components/SignInMember';
import store from './utils/store.js';
import { Provider } from 'react-redux';
// Importing our theme provider which will make our global state available to child components
// import CarProvider from './utils/CarContext';

export default function App() {
  useEffect(() => {
    document.title = 'Digital Garage';
  }, []);

  return (
    <Provider  store= {store}>
      <SignInMember />
    </Provider>
  );
}
