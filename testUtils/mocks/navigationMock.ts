export const mockedGoBack = jest.fn();
export const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    goBack: mockedGoBack,
    navigate: mockedNavigate,
  }),
}));
