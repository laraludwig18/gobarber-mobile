import styled from 'styled-components/native';

import { Colors } from '../../constants';

interface IHeaderProps {
  paddingTop: number;
}

export const Container = styled.View<IHeaderProps>`
  height: 140px;
  padding: 0 24px;
  padding-top: ${(props) => props.paddingTop}px;
  background-color: ${Colors.BLACK_MEDIUM};

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
