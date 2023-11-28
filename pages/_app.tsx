// import { AppProps } from 'next/app'
// import '../styles/index.css'

// function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

// export default MyApp


// _app.tsx that now wraps the Shopping Cart
import { AppProps } from 'next/app';
import { CartProvider } from './products/CartContext'; // Adjust the path accordingly
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;