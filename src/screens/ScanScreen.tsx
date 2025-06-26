import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import MrzScanner from '../components/MrzScanner';
import { MrzData } from '../types';
import { mrzDataToPerson } from '../services/mrzParser';
import { styles } from './ScanScreen.styles';

type ScanScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Scan'>;
};

const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const [showScanner, setShowScanner] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const buttonAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    if (!showScanner) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.5))
        }),
        Animated.timing(buttonAnim, {
          toValue: 1,
          duration: 1000,
          delay: 400,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        })
      ]).start();
      
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          })
        ])
      ).start();
    }
  }, [showScanner]);

  const handleMrzDetected = (mrzData: MrzData) => {
    const person = mrzDataToPerson(mrzData);
    
    navigation.navigate('Authorization', { person });
  };
  
  const handleStartScan = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic)
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.in(Easing.cubic)
      })
    ]).start(() => {
      setShowScanner(true);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {showScanner ? (
        <MrzScanner 
          onScanComplete={handleMrzDetected} 
          onBack={() => setShowScanner(false)}
        />
      ) : (
        <Animated.View 
          style={[
            styles.startContainer,
            { 
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.card}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>Control de Acceso</Text>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>🔍</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <Text style={styles.subtitle}>
              Escanee el MRZ de su DNI para verificar el acceso al evento
            </Text>
            
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionTitle}>¿Qué es el MRZ?</Text>
              <Text style={styles.instruction}>
                Es la zona con caracteres alfanuméricos que aparece en la parte inferior de su documento de identidad.
              </Text>
            </View>
            
            <Animated.View style={{
              opacity: buttonAnim,
              transform: [
                { scale: pulseAnim },
                { translateY: buttonAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })}
              ]
            }}>
              <TouchableOpacity 
                style={styles.startButton} 
                onPress={handleStartScan}
                activeOpacity={0.8}
              >
                <Text style={styles.startButtonText}>Iniciar Escaneo</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};



export default ScanScreen;
