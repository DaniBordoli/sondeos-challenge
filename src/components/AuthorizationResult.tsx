import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { Person, AuthorizationResponse } from '../types';
import { styles } from './AuthorizationResult.styles';

interface AuthorizationResultProps {
  person: Person;
  authResponse: AuthorizationResponse;
  onContinue: () => void;
}

const AuthorizationResult: React.FC<AuthorizationResultProps> = ({
  person,
  authResponse,
  onContinue,
}) => {
  const isAuthorized = authResponse.authorized;
  
  const scaleAnim = new Animated.Value(0.5);
  const opacityAnim = new Animated.Value(0);
  const buttonAnim = new Animated.Value(0);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
    
    if (isAuthorized) {
      Animated.timing(buttonAnim, {
        toValue: 1,
        duration: 800,
        delay: 600,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container, 
        isAuthorized ? styles.authorized : styles.denied,
        {
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={[styles.resultIcon, isAuthorized ? styles.authorizedIcon : styles.deniedIcon]}>
        <Text style={styles.resultIconText}>{isAuthorized ? '✓' : '✗'}</Text>
      </View>
      
      <Text style={[styles.resultTitle, isAuthorized ? styles.authorizedText : styles.deniedText]}>
        {isAuthorized ? 'Acceso Permitido' : 'Acceso Denegado'}
      </Text>
      
      <Text style={styles.message}>{authResponse.message}</Text>
      
      <View style={styles.personInfo}>
        <Text style={styles.personInfoTitle}>Información del documento:</Text>
        <View style={styles.personInfoRow}>
          <Text style={styles.personInfoLabel}>Nombre:</Text>
          <Text style={styles.personInfoValue}>{person.firstName} {person.lastName}</Text>
        </View>
        <View style={styles.personInfoRow}>
          <Text style={styles.personInfoLabel}>DNI:</Text>
          <Text style={styles.personInfoValue}>{person.dni}</Text>
        </View>
        <View style={styles.personInfoRow}>
          <Text style={styles.personInfoLabel}>Edad:</Text>
          <Text style={styles.personInfoValue}>
            {person.isAdult ? 'Mayor de edad' : 'Menor de edad'}
          </Text>
        </View>
      </View>
      
      {isAuthorized && (
        <Animated.View style={{
          opacity: buttonAnim,
          transform: [{
            translateY: buttonAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            })
          }]
        }}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Ver Menú de Bebidas</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </Animated.View>
  );
};



export default AuthorizationResult;
