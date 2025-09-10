import { createContext, useContext, useReducer, useEffect } from 'react';

// Create the authentication context
const AuthContext = createContext();

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

// Authentication reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'LOGOUT' });
        }
      } catch (error) {
        console.error('Authentication error:', error);
        dispatch({ type: 'AUTH_ERROR', payload: 'Authentication failed' });
      }
    };

    checkAuth();
  }, []);

  // Register a new user
  const register = (userData) => {
    try {
      // In a real app, this would be an API call
      // For this app, we'll store in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      dispatch({ type: 'LOGIN_SUCCESS', payload: userData });
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      dispatch({ type: 'AUTH_ERROR', payload: 'Registration failed' });
      return false;
    }
  };

  // Login user
  const login = (credentials) => {
    try {
      // In a real app, this would validate against an API
      // For this app, we'll check localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      
      if (storedUser && 
          storedUser.email === credentials.email && 
          storedUser.password === credentials.password) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: storedUser });
        return true;
      } else {
        dispatch({ type: 'AUTH_ERROR', payload: 'Invalid credentials' });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'AUTH_ERROR', payload: 'Login failed' });
      return false;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // Clear any errors
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};