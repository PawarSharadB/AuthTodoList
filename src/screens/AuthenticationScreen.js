import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import Button from '../components/Button';
import { COLORS } from '../constants/colors';

const AuthenticationScreen = ({ navigation }) => {
  const [authStatus, setAuthStatus] = useState('');

  const checkBiometric = async () => {
    const availableBiometrics =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (
      availableBiometrics.includes(
        LocalAuthentication.AuthenticationType.FINGERPRINT
      )
    ) {
      authenticate();
    } else {
      setAuthStatus('Fingerprint authentication not available');
    }
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate using your fingerprint',
      });

      if (result.success) {
        navigation.navigate('Home');
      } else {
        setAuthStatus('Authentication failed');
      }
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.authStatus}>{authStatus}</Text>
      <Button
        title='Authenticate'
        onPress={checkBiometric}
        color={COLORS.purple}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authStatus: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default AuthenticationScreen;
