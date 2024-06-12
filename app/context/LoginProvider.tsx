import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import client from '../api/client';

interface Profile {
  [key: string]: any;
}

interface LoginContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  profile: Profile;
  setProfile: (profile: Profile) => void;
  loginPending: boolean; // Adicionando a propriedade loginPending
  setLoginPending: (loginPending: boolean) => void; // Adicionando o setter para loginPending
}

const LoginContext = createContext<LoginContextProps | undefined>(undefined);

interface LoginProviderProps {
  children: ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>({});
  const [loginPending, setLoginPending] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        setLoginPending(true);
        const res = await client.get('/profile', {
          headers: {
            Authorization: `JWT ${token}`
          }
        });

        if (res.data.success) {
          setProfile(res.data.profile);
          setIsLoggedIn(true);
        } else {
          setProfile({});
          setIsLoggedIn(false);
        }
        setLoginPending(false);
      }
    } catch (error: any) { // Definindo o tipo de 'error' como 'any'
      console.log('Erro ao buscar usuário:', error.message);
      setLoginPending(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, loginPending, setLoginPending, setIsLoggedIn, profile, setProfile }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextProps => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};

export default LoginProvider;
