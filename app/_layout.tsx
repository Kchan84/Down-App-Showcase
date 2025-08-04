import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Amplify } from 'aws-amplify';
import { Stack } from "expo-router";
import { useColorScheme } from 'react-native';
import awsconfig from '../aws-exports';

// Configure Amplify - temporarily disabled for web development
Amplify.configure(awsconfig);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Shared purple accent colors
  const purpleAccent = {
    text: '#966fe8',
    primary: '#966fe8',
  };

  // Light mode + purple accents
  const LightPurpleTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#f5f5f5',      // light background
      text: purpleAccent.text,
      primary: purpleAccent.primary,
    },
  };

  // Dark mode + purple accents
  const DarkPurpleTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#333236',      // dark background
      text: purpleAccent.text,
      primary: purpleAccent.primary,
    },
  };

  // Choose based on system mode
  const theme = colorScheme === 'dark' ? DarkPurpleTheme : LightPurpleTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerTintColor: purpleAccent.text,
          headerStyle: {
            backgroundColor: '#8551f5',
          },
        }}
      />
    </ThemeProvider>
  );
}
