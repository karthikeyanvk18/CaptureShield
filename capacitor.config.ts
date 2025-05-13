
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.CaptureShield.com',
  appName: 'CaptureShield',
  webDir: 'dist',
  server: {
    url: 'https://captureshield2.netlify.app/',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  },
  plugins: {
    Camera: {
      includePermissions: [
        "android.permission.CAMERA"
      ]
    },
    Geolocation: {
      includePermissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_BACKGROUND_LOCATION"
      ]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#19A7CE",
      sound: "beep.wav",
    },
    CapacitorHttp: {
      enabled: true
    },
    PrivacyScreen: {
      enable: true,
      background: "#19A7CE"
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#0B2447",
      splashFullScreen: true,
      splashImmersive: true
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    }
  }
};

export default config;
