'use client';

import { Provider } from 'react-redux';
import {store} from '../redux/store';

const Wrapper = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Wrapper;
