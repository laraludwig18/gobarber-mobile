import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('react-native-safe-area-context', () => ({
  useSafeArea: () => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }),
}));
