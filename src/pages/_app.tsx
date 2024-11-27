import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import 'react-tooltip/dist/react-tooltip.css'
function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
     <Toaster  position="top-right" reverseOrder={false}/>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
