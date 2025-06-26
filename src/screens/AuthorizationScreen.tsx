import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { checkAuthorization } from '../services/api';
import { AuthorizationResponse } from '../types';
import AuthorizationResult from '../components/AuthorizationResult';

type AuthorizationScreenProps = {
  route: RouteProp<RootStackParamList, 'Authorization'>;
  navigation: StackNavigationProp<RootStackParamList, 'Authorization'>;
};

const AuthorizationScreen: React.FC<AuthorizationScreenProps> = ({ route, navigation }) => {
  const { person } = route.params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authResponse, setAuthResponse] = useState<AuthorizationResponse | null>(null);

  useEffect(() => {
    const verifyAuthorization = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await checkAuthorization(person.dni);
        setAuthResponse(response);
      } catch (err) {
        setError('No se pudo verificar la autorización. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    verifyAuthorization();
  }, [person.dni]);

  const handleContinue = () => {
    if (authResponse && authResponse.authorized) {
      navigation.navigate('DrinksMenu', { 
        person, 
        authResponse 
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#f4511e" />
          <Text style={styles.loadingText}>Verificando autorización...</Text>
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : authResponse ? (
        <AuthorizationResult 
          person={person} 
          authResponse={authResponse} 
          onContinue={handleContinue} 
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
  },
});

export default AuthorizationScreen;
