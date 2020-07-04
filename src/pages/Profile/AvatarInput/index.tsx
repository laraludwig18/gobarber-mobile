import React, { useCallback } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker, { ImagePickerOptions } from 'react-native-image-picker';

import { useAuth } from '../../../context/auth';
import { useApiClient } from '../../../services/apiClient';

import { Colors } from '../../../constants';
import { Avatar, ChangeAvatarButton, Container } from './styles';

const AvatarInput: React.FC = () => {
  const { user, updateUser } = useAuth();
  const api = useApiClient();

  const sendUpdatedUserAvatar = useCallback(
    async (imagePickerResponse) => {
      try {
        const { uri, type, fileName } = imagePickerResponse;

        const data = new FormData();

        data.append('avatar', {
          type,
          uri,
          name: fileName,
        });

        const response = await api.patch('/users/avatar', data);

        updateUser(response.data);
      } catch (err) {
        Alert.alert(
          'Erro na atualização do avatar.',
          'Ocorreu um erro ao atualizar seu avatar, tente novamente.',
        );
      }
    },
    [api, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    const options = {
      title: 'Selecione um avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Usar câmera',
      chooseFromLibraryButtonTitle: 'Escolher da galeria',
      maxHeight: 800,
      maxWidth: 800,
    } as ImagePickerOptions;

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        return;
      }

      if (response.error) {
        Alert.alert('Erro ao atualizar seu avatar.');
        return;
      }

      sendUpdatedUserAvatar(response);
    });
  }, [sendUpdatedUserAvatar]);

  return (
    <Container>
      <Avatar testID="userAvatar" source={{ uri: user.avatarUrl }} />

      <ChangeAvatarButton
        testID="changeAvatarButton"
        onPress={handleUpdateAvatar}
      >
        <Icon name="camera" size={22} color={Colors.BACKGROUND} />
      </ChangeAvatarButton>
    </Container>
  );
};

export default AvatarInput;
