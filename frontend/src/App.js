import './App.css';
import Router from './components/Router'
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router/>
      </AuthProvider> 
    </div>
  );
}

export default App;
