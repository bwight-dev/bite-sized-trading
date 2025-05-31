import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config'; // Assuming you have a config file for API_URL

export const login = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const data = await response.json();
        await AsyncStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (error) {
        throw error;
    }
};

export const isAuthenticated = async () => {
    const token = await AsyncStorage.getItem('token');
    return token !== null;
};