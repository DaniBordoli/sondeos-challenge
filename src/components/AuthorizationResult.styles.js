import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    borderRadius: 16,
    margin: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  authorized: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  denied: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  resultIcon: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  authorizedIcon: {
    backgroundColor: '#4caf50',
  },
  deniedIcon: {
    backgroundColor: '#f44336',
  },
  resultIconText: {
    fontSize: 50,
    color: '#fff',
    fontWeight: 'bold',
  },
  resultTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  authorizedText: {
    color: '#2e7d32',
  },
  deniedText: {
    color: '#c62828',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#555',
    lineHeight: 22,
  },
  personInfo: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 18,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  personInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  personInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  personInfoLabel: {
    fontSize: 15,
    fontWeight: '500',
    width: 70,
    color: '#666',
  },
  personInfoValue: {
    fontSize: 15,
    flex: 1,
    color: '#333',
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
