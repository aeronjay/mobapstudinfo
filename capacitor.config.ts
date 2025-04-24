import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studentinfo.app',
  appName: 'studentinfo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
