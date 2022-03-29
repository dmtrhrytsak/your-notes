import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'App';
import AuthContextProvider from 'utils/contexts/auth.context';

import 'index.css';
import ToastsContextProvider from 'utils/contexts/toasts.context';

ReactDOM.render(
  <AuthContextProvider>
    <ToastsContextProvider>
      <Router>
        <App />
      </Router>
    </ToastsContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
