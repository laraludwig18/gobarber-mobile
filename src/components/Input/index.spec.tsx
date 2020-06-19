import React from 'react';
import { render, fireEvent, waitFor } from 'react-native-testing-library';

import Input from '.';

jest.mock('@unform/core', () => ({
  useField: () => ({
    fieldName: 'email',
    defaultValue: '',
    error: '',
    registerField: jest.fn(),
  }),
}));

describe('Input Component', () => {
  it('should be able to render an input', async () => {
    const { getByPlaceholder } = render(
      <Input name="email" placeholder="Digite seu email" />,
    );

    expect(getByPlaceholder('Digite seu email')).toBeTruthy();
  });

  it('should be able to render an input with an icon', async () => {
    const { getByTestId } = render(
      <Input name="email" placeholder="Digite seu email" icon="mail" />,
    );

    expect(getByTestId('inputIcon')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByPlaceholder, getByTestId } = render(
      <Input name="email" placeholder="Digite seu email" icon="mail" />,
    );

    const iconElement = getByTestId('inputIcon');
    const inputElement = getByPlaceholder('Digite seu email');
    const containerElement = getByTestId('inputContainer');

    fireEvent(inputElement, 'focus');

    await waitFor(() => {
      expect(containerElement).toHaveStyle({ borderColor: '#ff9000' });
      expect(iconElement).toHaveStyle({ color: '#ff9000' });
    });

    fireEvent(inputElement, 'blur');

    await waitFor(() => {
      expect(containerElement).not.toHaveStyle({ borderColor: '#ff9000' });
      expect(iconElement).not.toHaveStyle({ color: '#ff9000' });
    });
  });

  it('should keep color when input filled', async () => {
    const { getByPlaceholder, getByTestId } = render(
      <Input name="email" placeholder="Digite seu email" icon="mail" />,
    );

    const iconElement = getByTestId('inputIcon');
    const inputElement = getByPlaceholder('Digite seu email');

    fireEvent.changeText(inputElement, 'johndoe@example.com');

    fireEvent(inputElement, 'blur');

    await waitFor(() => {
      expect(iconElement).toHaveStyle({ color: '#ff9000' });
    });
  });
});
