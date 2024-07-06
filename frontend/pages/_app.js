import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import './styles/globals.css';
import Navbar from '@/components/NavBar';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Navbar/>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
