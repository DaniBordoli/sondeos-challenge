import React, { useEffect, useRef } from 'react';
import { FlatList, Text, View, ActivityIndicator, Animated, Easing } from 'react-native';
import { Drink } from '../types';
import DrinkCard from './DrinkCard';
import { styles } from './DrinksList.styles';

interface DrinksListProps {
  drinks: Drink[];
  isLoading: boolean;
  error: string | null;
  isAdult: boolean;
}

const DrinksList: React.FC<DrinksListProps> = ({ drinks, isLoading, error, isAdult }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const loadingAnim = useRef(new Animated.Value(0)).current;
  
  const filteredDrinks = isAdult 
    ? drinks 
    : drinks.filter(drink => !drink.alcoholic);
  
  useEffect(() => {
    if (!isLoading && !error && filteredDrinks.length > 0) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic)
      }).start();
    }
    
    if (isLoading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(loadingAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          }),
          Animated.timing(loadingAnim, {
            toValue: 0.7,
            duration: 800,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease)
          })
        ])
      ).start();
    }
  }, [isLoading, error, filteredDrinks.length]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Animated.View style={{
          opacity: loadingAnim,
          transform: [{
            scale: loadingAnim.interpolate({
              inputRange: [0.7, 1],
              outputRange: [0.9, 1.1]
            })
          }]
        }}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </Animated.View>
        <Text style={styles.loadingText}>Cargando bebidas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>!</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Text style={styles.errorSubtext}>Intente nuevamente más tarde</Text>
        </View>
      </View>
    );
  }

  if (filteredDrinks.length === 0) {
    return (
      <View style={styles.centered}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🥤</Text>
          <Text style={styles.emptyText}>No hay bebidas disponibles</Text>
        </View>
      </View>
    );
  }

  return (
    <Animated.View 
      style={[
        styles.container,
        { opacity: fadeAnim }
      ]}
    >
      {!isAdult && (
        <View style={styles.ageNotice}>
          <Text style={styles.ageNoticeIcon}>ℹ️</Text>
          <Text style={styles.ageNoticeText}>
            Solo se muestran bebidas sin alcohol para menores de edad
          </Text>
        </View>
      )}
      <FlatList
        data={filteredDrinks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => {
          const itemAnimationDelay = 150 * index;
          return (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]
                  })
                }]
              }}
            >
              <DrinkCard drink={item} />
            </Animated.View>
          );
        }}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
};



export default DrinksList;
