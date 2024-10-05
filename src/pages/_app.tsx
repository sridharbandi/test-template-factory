import type { AppProps } from 'next/app';
import { ThemeProvider } from '../components/ThemeProvider';
import '../styles/globals.css';
import '../styles/burger-menu-animation.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
