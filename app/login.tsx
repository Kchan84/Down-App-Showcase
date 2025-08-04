import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';

import CustomButton from './components/ThemedButton';
import ThemedText from './components/ThemedText';
import ThemedTextInput from './components/ThemedTextInput';

import { fetchAuthSession, signInWithRedirect, signOut } from 'aws-amplify/auth';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAppleAvailable, setIsAppleAvailable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check authentication state periodically
  useEffect(() => {
    let isChecking = false;

    const checkAuthState = async () => {
      if (isChecking) return; // Prevent multiple simultaneous checks
      isChecking = true;

      try {
        const session = await fetchAuthSession();

        if (session.tokens) {
          console.log('✅ User is authenticated, redirecting to profile');
          router.push('/profile');
          return; // Stop checking once authenticated
        }
      } catch (error: any) {
        // Only log if it's not the expected "unauthenticated" error
        if (!error.message?.includes('Unauthenticated access')) {
          console.log('❌ Unexpected auth error:', error.message);
        }
      } finally {
        isChecking = false;
      }
    };

    // Check immediately
    checkAuthState();

    // Check every 5 seconds instead of 2
    const interval = setInterval(checkAuthState, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Temporarily disabled for web development
      // await signIn({ username: email, password });
      console.log('Login attempt:', { email, password });
      Alert.alert('Success', 'Logged in successfully! (Demo mode)');
      // router.push('/dashboard');
    } catch (error: any) {
      console.error('Sign in error:', error);
      Alert.alert('Error', error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithRedirect({ provider: 'Google' });
      // This will open the Cognito Hosted UI for Google Sign-In
      // On success, Amplify will handle user registration/login automatically
    } catch (error: any) {
      console.error('Cognito Google Sign-In error:', error);
      Alert.alert('Google Sign-In Error', error.message || 'Failed to sign in with Google');
    }
  };

  const handleAppleSignIn = async () => {
    console.log('🍎 Starting Apple Sign-In...');
    try {
      console.log('🔄 Calling signInWithRedirect...');
      await signInWithRedirect({ provider: 'Apple' });
      console.log('✅ signInWithRedirect completed - hosted UI should open');
      // This will open the Cognito Hosted UI for Apple Sign-In
      // On success, Amplify will handle user registration/login automatically
      // The useEffect above will detect the successful sign-in and redirect to profile
    } catch (error: any) {
      console.error('❌ Cognito Apple Sign-In error:', error);
      Alert.alert('Apple Sign-In Error', error.message || 'Failed to sign in with Apple');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      Alert.alert('Success', 'Signed out successfully');
    } catch (error: any) {
      console.error('Sign out error:', error);
      Alert.alert('Error', error.message || 'Failed to sign out');
    }
  };

  useEffect(() => {
    const checkAppleAvailability = async () => {
      const available = await AppleAuthentication.isAvailableAsync();
      setIsAppleAvailable(available);
    };
    checkAppleAvailability();
  }, []);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <ThemedText>Login</ThemedText>

      {/* Login with Email and Password */}
      <ThemedTextInput placeholder="Email" onChangeText={setEmail} />
      <ThemedTextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />

      <Button title="Create new account" onPress={() => router.push("/onBoardingName")} />

      <CustomButton
        title={loading ? "Signing In..." : "Submit"}
        onPress={handleSubmit}
      />

      {/* Test Sign Out Button */}
      <CustomButton
        title="Sign Out (Test)"
        onPress={handleSignOut}
      />

      {/* Login with Google button */}
      <View style={{ marginTop: 16 }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4285F4',
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
            marginBottom: 8,
            width: 200,
            alignItems: 'center'
          }}
          onPress={handleGoogleSignIn}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login with Apple button */}
      {isAppleAvailable && (
        <View style={{ marginTop: 8 }}>
          {/* Temporarily disabled for web development */}
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={5}
            style={{ width: 200, height: 44 }}
            onPress={handleAppleSignIn}
          />
        </View>
      )}
    </View>
  );
}
