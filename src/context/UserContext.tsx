import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface UserContextProps {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

// Mock user data
const mockUser: User = {
    id: 'user-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    portfolios: [],
    preferredCurrency: 'USD',
    riskTolerance: 'medium',
    notifications: true,
    theme: 'light',
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(mockUser);
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setUser(mockUser);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData });
        }
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};