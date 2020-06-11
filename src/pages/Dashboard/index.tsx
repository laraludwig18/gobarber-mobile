import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Header from '../../components/Header';
import Provider from './Provider';
import { IProvider } from './types';
import { useApiClient } from '../../services/apiClient';
import { useAuth } from '../../context/auth';

import {
  Container,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProvidersList,
  ProvidersListTitle,
} from './styles';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();
  const api = useApiClient();

  const [providers, setProviders] = useState<IProvider[]>([]);

  useEffect(() => {
    async function getProviders(): Promise<void> {
      const { data } = await api.get('providers');

      setProviders(data);
    }

    getProviders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateToProfile = useCallback(() => {
    // navigate('Profile');
    signOut();
  }, [signOut]);

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#28262e" />
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatarUrl }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        keyExtractor={(provider) => provider.id}
        renderItem={({ item: provider }) => <Provider provider={provider} />}
      />
    </Container>
  );
};

export default Dashboard;
