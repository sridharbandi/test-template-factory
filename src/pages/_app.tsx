import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '../components/ThemeProvider';
import '../styles/globals.css';
import '../styles/burger-menu-animation.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Head>
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1"></meta>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
