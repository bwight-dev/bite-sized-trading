import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api';

interface AuthResponse {
  user: any;
  token: string;
}

export class AuthService {
  private static async getAuthHeader() {
    const token = await AsyncStorage.getItem('@Auth:token');
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      return response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(name: string, email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async checkAuthStatus(): Promise<any> {
    try {
      const headers = await this.getAuthHeader();
      const response = await fetch(`${API_URL}/auth/me`, headers);

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      return response.json();
    } catch (error) {
      console.error('Auth status check error:', error);
      throw error;
    }
  }
} 