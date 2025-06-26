import axios from 'axios';
import { AuthorizationResponse, Drink } from '../types';

const BASE_URL = 'http://fakeapi.showvlad.com/api';

export const checkAuthorization = async (dni: string): Promise<AuthorizationResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/event-authorization?dni=${dni}`);
    
    return {
      authorized: response.data.authorized,
      message: response.data.authorized ? 'Acceso permitido' : 'Acceso denegado',
      eventName: 'Evento Sondeos 2025',
      personName: dni
    };
  } catch (error) {
    return {
      authorized: false,
      message: 'Error al verificar autorización. Inténtelo de nuevo.',
      eventName: 'Error de conexión',
      personName: ''
    };
  }
};

export const getDrinks = async (): Promise<Drink[]> => {
  try {
    const response = await axios.get<Drink[]>(`${BASE_URL}/event-drinks`);
    
    const drinksWithFullImageUrls = response.data.map(drink => {
      const baseImageUrl = BASE_URL.replace('/api', '');
      
      return {
        ...drink,
        image: drink.image && drink.image.startsWith('http') 
          ? drink.image 
          : drink.image 
            ? `${baseImageUrl}${drink.image}` 
            : 'https://via.placeholder.com/150?text=NoImage'
      };
    });
    
    return drinksWithFullImageUrls;
  } catch (error) {
    return [
      {
        id: 999,
        name: 'Agua Mineral',
        description: 'Agua mineral sin gas (respaldo por error)',
        price: 1.5,
        alcoholic: false,
        image: 'https://via.placeholder.com/150?text=Agua'
      }
    ];
  }
};
