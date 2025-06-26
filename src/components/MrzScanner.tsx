import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import { styles } from './MrzScanner.styles';
import { parseMrzText } from '../services/mrzParser';
import { MrzData } from '../types';

interface MrzScannerProps {
  onScanComplete: (mrzData: MrzData) => void;
  onBack?: () => void;
}

const processImageWithMLKit = async ({ path }: { path: string }): Promise<string> => {
  try {
    const formattedPath = Platform.OS === 'android' && !path.startsWith('file://') 
      ? `file://${path}` 
      : path;
    
    const result = await TextRecognition.recognize(formattedPath);
    return result.text;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    throw new Error(`Error al procesar la imagen: ${errorMessage}`);
  }
};

const MrzScanner: React.FC<MrzScannerProps> = ({ onScanComplete, onBack }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastDetectedText, setLastDetectedText] = useState<string>('');
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice('back');
  
  useEffect(() => {
    const requestCameraPermission = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'granted');
    };
    
    requestCameraPermission();
  }, []);

  const { width: screenWidth } = Dimensions.get('window');
  
  const handleScan = async () => {
    if (!cameraRef.current) return;
    
    try {
      setScanning(true);
      setError(null);
      
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
        enableShutterSound: false
      });
      
      const recognizedText = await processImageWithMLKit({ path: photo.path });
      setLastDetectedText(recognizedText);
      
      const mrzData = parseMrzText(recognizedText);
      
      setScanning(false);
      
      if (mrzData && mrzData.documentNumber) {
        Alert.alert(
          'DNI Detectado',
          `Documento: ${mrzData.documentNumber || 'No detectado'}\n` +
          `Nombre: ${mrzData.firstName || ''} ${mrzData.lastName || ''}\n` +
          `Fecha: ${mrzData.dateOfBirth || 'No detectada'}`,
          [
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Continuar',
              onPress: () => {
                onScanComplete(mrzData);
              }
            }
          ]
        );
      } else {
        setError('No se pudieron extraer datos del MRZ. Por favor, intente nuevamente.');
      }
    } catch (error) {
      setScanning(false);
      setError('Ocurrió un error al escanear. Por favor, intente nuevamente.');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.text}>Solicitando permisos de cámara...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Se requiere acceso a la cámara para escanear documentos.
        </Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.text}>Cargando cámara...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo={true}
      />
      
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.closeButton} 
          onPress={onBack}
        >
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        
        <Text style={styles.instructionText}>
          Enfoque el dorso del DNI en el recuadro lo mas cerca posible
        </Text>
        
        <View style={styles.scanAreaContainer}>
          <View 
            style={[
              styles.scanArea,
              { 
                borderColor: scanning ? '#4CAF50' : '#FFFFFF'
              }
            ]}
          >
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
        </View>
        
      </View>
      

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, scanning && styles.buttonDisabled]}
          onPress={handleScan}
          disabled={scanning}
        >
          {scanning ? (
            <View style={styles.scanningContainer}>
              <ActivityIndicator size="small" color="#fff" />
              <Text style={styles.scanningText}>Procesando...</Text>
            </View>
          ) : (
            <>
              <Text style={styles.buttonText}>Escanear DNI</Text>
              <Text style={styles.buttonSubText}>Toque para capturar</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default MrzScanner;
