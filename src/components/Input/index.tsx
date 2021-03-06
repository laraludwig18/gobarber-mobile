import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Colors } from '../../constants';

import { Container, TextInput, Icon, Error, Wrapper } from './styles';

interface IInputProps extends TextInputProps {
  name: string;
  icon?: string;
  containerStyle?: {};
}

interface IInputValueReference {
  value: string;
}

interface IInputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<IInputRef, IInputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputElementRef = useRef<any>(null);
  const inputValueRef = useRef<IInputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  // pass input ref from parent to child
  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Wrapper>
      <Container
        testID="inputContainer"
        style={containerStyle}
        isFocused={isFocused}
        isErrored={!!error}
      >
        {icon && (
          <Icon
            testID="inputIcon"
            name={icon}
            size={20}
            color={isFocused || isFilled ? Colors.ORANGE : Colors.GRAY_HARD}
          />
        )}

        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={Colors.GRAY_HARD}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value) => {
            inputValueRef.current.value = value;
          }}
          {...rest}
        />
      </Container>
      {error && <Error>{error}</Error>}
    </Wrapper>
  );
};

export default forwardRef(Input);
