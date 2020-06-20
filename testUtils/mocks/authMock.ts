export const mockedUpdateUser = jest.fn();
export const mockedSignIn = jest.fn();

jest.mock('../../src/context/auth.tsx', () => ({
  useAuth: () => ({
    updateUser: mockedUpdateUser,
    signIn: mockedSignIn,
    user: {
      id: 'id',
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      avatarUrl: 'avatar-url',
    },
  }),
}));
