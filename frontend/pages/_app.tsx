import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '../src/store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div id="app-root">
        <header style={{ padding: '12px 24px', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
          <h2 style={{ margin: 0 }}>SquadProject</h2>
        </header>

        <main style={{ padding: '24px' }}>
          <Component {...pageProps} />
        </main>

        <footer style={{ textAlign: 'center', padding: '20px 0', color: '#6b7280' }}>
          © {new Date().getFullYear()} SquadProject
        </footer>
      </div>
    </Provider>
  );
}
