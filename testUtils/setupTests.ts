import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import './mocks/formDataMock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
}));
