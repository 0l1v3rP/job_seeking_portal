import './App.css';
import Router from './components/Router'
import { AuthProvider } from './contexts/AuthProvider';
import { ToastProvider } from './contexts/ToastProvider';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <ToastProvider>
          <Router/>
        </ToastProvider>
      </AuthProvider> 
    </div>
  );
}

export default App;
