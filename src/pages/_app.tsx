import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import 'react-tooltip/dist/react-tooltip.css'
import { Open_Sans } from 'next/font/google';
import { UserProvider } from '@/providers/user.context';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal'
});

function MyApp({ Component, pageProps }: AppProps) {

  return (
  <UserProvider>
    <main className={openSans.className}>
      <Toaster position="top-right" reverseOrder={false} />
      <Component {...pageProps} />
    </main>
    </UserProvider>
  );
}

export default MyApp;