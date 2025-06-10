import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter, Link } from 'expo-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useAuthStore } from '@/stores/auth-store';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any credentials
      await login({ email, password }, false);
      
      // Navigate to main app
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGuestAccess = () => {
    router.push('/guest/index');
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1578297886235-f2be6e8f3c3e?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.logo}
          />
          <Text style={styles.title}>Welcome to Elbasan City</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>
        
        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
          
          <View style={styles.inputContainer}>
            <Mail size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={Colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock size={20} color={Colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={Colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon} 
              onPress={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={20} color={Colors.textSecondary} />
              ) : (
                <Eye size={20} color={Colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </TouchableOpacity>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account? </Text>
            <Link href="/signup" asChild>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>
          
          <TouchableOpacity 
            style={styles.guestButton}
            onPress={handleGuestAccess}
          >
            <Text style={styles.guestButtonText}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: `${Colors.error}20`,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: Colors.text,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 8,
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  registerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  registerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  guestButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  guestButtonText: {
    color: Colors.text,
    fontSize: 16,
  },
});