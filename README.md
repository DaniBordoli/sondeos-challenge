# 📱 Sondeos - App de Control de Acceso y Menú de Bebidas

Esta aplicación React Native permite escanear el MRZ (Machine Readable Zone) de documentos de identidad o pasaportes, verificar la autorización de ingreso a un evento mediante una API externa, y mostrar un menú de bebidas filtrado según la edad del usuario.


## 💻 Stack Tecnológico

- ⚛️ **React Native** - v0.80.0
- 🔥 **TypeScript** - v5.0.4
- 🔙 **React Navigation** - v7.1.14
- 🌐 **Axios** - v1.10.0
- 📸 **Vision Camera** - v4.7.0
- 🔍 **ML Kit Text Recognition** - v1.5.2
- 🔄 **React Native Reanimated** - v3.18.0
- 📱 **Node.js** - v18 o superior


## 💻 Instalación

### Paso 1: Clonar el repositorio

```sh
git clone https://github.com/tu-usuario/sondeos.git
cd sondeos
npm install
```

### Paso 2: Iniciar Metro

Primero, necesitas ejecutar **Metro**, el bundler de JavaScript para React Native.

```sh
npm start
```

### Paso 3: Ejecutar la aplicación

Con Metro en ejecución, abre una nueva terminal desde la raíz del proyecto y usa uno de los siguientes comandos para compilar y ejecutar la aplicación:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

Para más información, visita la [Guía de inicio de CocoaPods](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Usando npm
npm run ios

# O usando Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.



## 📍 Flujo de la Aplicación

1. 📷 El usuario escanea el MRZ de su documento
2. 🔍 La aplicación extrae la información y verifica la autorización
3. ✅ Si está autorizado, se muestra el menú de bebidas filtrado por edad


