import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Container } from './styles';

const Header: React.FC = ({ children }) => {
  const { top } = useSafeAreaInsets();

  return <Container paddingTop={top}>{children}</Container>;
};

export default Header;
