export const mockedGoBack = jest.fn();
export const mockedNavigate = jest.fn();
export const mockedReset = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockedGoBack,
    navigate: mockedNavigate,
    reset: mockedReset,
  }),
  useRoute: () => ({
    params: {
      date: 121212,
      providerId: 'id-1',
    },
  }),
}));
