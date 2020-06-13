import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { useApiClient } from '../services/apiClient';

interface IUser {
  id: string;
  avatarUrl?: string;
  name: string;
  email: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  token: string;
  loading: boolean;
  signIn(credentials: ISignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const api = useApiClient();

  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      // Return key as index 0 and value as index 1
      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  const signIn = useCallback(
    async ({ email, password }: ISignInCredentials) => {
      const response = await api.post('sessions', { email, password });

      const { token, user } = response.data;

      await AsyncStorage.multiSet([
        ['@GoBarber:token', token],
        ['@GoBarber:user', JSON.stringify(user)],
      ]);

      setData({ token, user });
    },
    [api],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as IAuthState);
  }, []);

  const updateUser = useCallback(
    async (user: IUser) => {
      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
        updateUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
