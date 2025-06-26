import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { getDrinks } from '../services/api';
import { Drink } from '../types';
import DrinksList from '../components/DrinksList';

type DrinksMenuScreenProps = {
  route: RouteProp<RootStackParamList, 'DrinksMenu'>;
  navigation: StackNavigationProp<RootStackParamList, 'DrinksMenu'>;
};

const DrinksMenuScreen: React.FC<DrinksMenuScreenProps> = ({ route }) => {
  const { person } = route.params;
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const drinksData = await getDrinks();
        setDrinks(drinksData);
      } catch (err) {
        console.error('Error al obtener bebidas:', err);
        setError('No se pudieron cargar las bebidas. Intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hola, {person.firstName}!</Text>
        <Text style={styles.subtitle}>Menú de bebidas disponibles</Text>
      </View>
      
      <DrinksList 
        drinks={drinks} 
        isLoading={loading} 
        error={error} 
        isAdult={person.isAdult} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default DrinksMenuScreen;
