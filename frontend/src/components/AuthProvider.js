import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setSignedIn] = useState(null);

  async function checkSignInStatus() {
    try {
      const response = await fetch('http://localhost:8000/checksigninstatus', {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      return data.isLoggedIn;
    } catch (error) {
      console.error('Error checking sign-in status:', error);
      return false;
    }
  }

  useEffect(() => {
    async function fetchSignInStatus() {
      const status = await checkSignInStatus();
      setSignedIn(status);
    }
    fetchSignInStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isSignedIn, setSignedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
