import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shreeva.newAppName',
  appName: 'newAppName',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    SplashScreen:{
      launchAutoHide:false
    }
  }
};

export default config;
