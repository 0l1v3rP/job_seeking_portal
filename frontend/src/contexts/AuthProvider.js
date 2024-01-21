import { createContext, useContext, useState, useEffect } from 'react';
import { companyStatusEnum, mapCompanyStatus } from '../utils/constants/companyStatus'; 

const AuthContext = createContext();

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

async function getCompanyStatus() {
  try {
    const response = await fetch('http://localhost:8000/getCompanyStatus', {
      method: 'GET',
      credentials: 'include'
    });
    const data = await response.json();
    return mapCompanyStatus(data);
  } catch (error) {
    console.error('Error getting company status:', error);
    return companyStatusEnum.NONE;
  }
}

export function AuthProvider({ children }) {

  const [authState, setAuthState] = useState({
    isSignedIn : null,
    companyStatus : null,
  });

  useEffect(() => {
    async function fetchSignInStatus() {
      const signInStatus = await checkSignInStatus();
      const companyStatusResult = signInStatus ? await getCompanyStatus() : companyStatusEnum.NONE;

      setAuthState({
        isSignedIn: signInStatus,
        companyStatus: companyStatusResult
      });
    }
    fetchSignInStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
};

export function SetSignInState(setAuthState, status) {
  setAuthState(prevState => ({
    ...prevState,
    isSignedIn: status,
  }));
};

export function setCompanyStatusState(setAuthState, status) {
  setAuthState(prevState => ({
    ...prevState,
    companyStatus: status,
  }));
};

export async function fetchCompanyStatusState(setAuthState) {
  const status =  await getCompanyStatus();
  setAuthState(prevState => ({
    ...prevState,
    companyStatus: status,
  }));
}

export async function fetchSignIntate(setAuthState) {
  const status = await checkSignInStatus();
  setAuthState(prevState => ({
    ...prevState,
    isSignedIn: status,
  }));
}