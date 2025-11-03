import { createRoot } from 'react-dom/client';
import './App.jsx';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../config/envConfig.js"
import { ThemeProvider } from './theme-provider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ThemeProvider defaultTheme='system'>
      <App />
    </ThemeProvider>
  </GoogleOAuthProvider>
  </BrowserRouter>
);
