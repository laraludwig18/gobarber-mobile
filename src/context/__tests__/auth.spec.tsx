import { renderHook } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';

import mockedApi from '../../../testUtils/mocks/apiMock';
import { useAuth, AuthProvider } from '../auth';

const user = {
  id: 'id',
  email: 'johndoe@gmail.com',
  password: '212121',
  name: 'Jonh Doe',
};

const token = 'eyJhbGciOiJIUzI1NiIs';

const loginResponse = {
  user,
  token,
};

describe('Auth Hook', () => {
  beforeAll(() => {
    mockedApi.onPost('sessions').reply(200, loginResponse);
  });

  it('should be able to sign in', async () => {
    const multiSetSpy = jest.spyOn(AsyncStorage, 'multiSet');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const { email, password } = user;

    result.current.signIn({ email, password });

    await waitForNextUpdate();

    expect(result.current.user).toStrictEqual(user);
    expect(result.current.token).toStrictEqual(token);

    expect(multiSetSpy).toHaveBeenCalledWith([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);
  });

  describe('Pre saved user', () => {
    beforeAll(() => {
      jest.spyOn(AsyncStorage, 'multiGet').mockImplementationOnce((keys) => {
        type StorageValueType = {
          [key: string]: [string, string | null];
        };

        const storageValue: StorageValueType = {
          '@GoBarber:user': ['@GoBarber:user', JSON.stringify(user)],
          '@GoBarber:token': ['@GoBarber:token', token],
        };

        return Promise.all(
          keys.map((key) => Promise.resolve(storageValue[key])),
        );
      });
    });

    it('should restore saved data from storage when auth inits', async () => {
      const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      await waitForNextUpdate();

      expect(result.current.user).toStrictEqual(user);
      expect(result.current.token).toStrictEqual(token);
    });

    it('should be able to sign out', async () => {
      const multiRemoveSpy = jest.spyOn(AsyncStorage, 'multiRemove');

      const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      result.current.signOut();

      await waitForNextUpdate();

      expect(result.current.user).toBeUndefined();
      expect(result.current.token).toBeUndefined();

      expect(multiRemoveSpy).toHaveBeenCalledWith([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);
    });

    it('should be able to update user data', async () => {
      const setItemSpy = jest.spyOn(AsyncStorage, 'setItem');

      const updatedUser = {
        name: 'John Doe 2',
        email: 'johndoe2@example.com',
        id: 'id',
      };

      const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      result.current.updateUser(updatedUser);

      await waitForNextUpdate();

      expect(result.current.user).toStrictEqual(updatedUser);

      expect(setItemSpy).toHaveBeenCalledWith(
        '@GoBarber:user',
        JSON.stringify(updatedUser),
      );
    });
  });
});
