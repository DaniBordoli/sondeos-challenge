import React, { useRef } from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import { Drink } from '../types';
import { styles } from './DrinkCard.styles';

interface DrinkCardProps {
  drink: Drink;
}

const DrinkCard: React.FC<DrinkCardProps> = ({ drink }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      friction: 5,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 400,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View 
        style={[
          styles.card,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: drink.image || drink.imageUrl || 'https://via.placeholder.com/150?text=Bebida' }} 
            style={styles.image} 
            resizeMode="cover"
          />
          {drink.alcoholic && (
            <View style={styles.alcoholicBadge}>
              <Text style={styles.alcoholicText}>Contiene alcohol</Text>
            </View>
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{drink.name}</Text>
          <Text style={styles.description}>{drink.description}</Text>
          <View style={styles.footer}>
            <View style={styles.priceContainer}>
              <Text style={styles.priceLabel}>Precio</Text>
              <Text style={styles.price}>${drink.price.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};



export default DrinkCard;
