import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: 18,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  alcoholicBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(244, 67, 54, 0.9)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  alcoholicText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
