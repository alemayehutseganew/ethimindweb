import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart context
const CartContext = createContext();

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || [],
        isLoading: false
      };

    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        const newItem = {
          ...action.payload,
          quantity: action.payload.quantity || 1,
          addedAt: new Date().toISOString()
        };
        return { ...state, items: [...state.items, newItem] };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0) // Remove items with 0 quantity
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'TOGGLE_CART':
      return {
        ...state,
        isOpen: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  items: [],
  isOpen: false,
  isLoading: true
};

// Cart provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('nvidia-cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        dispatch({ type: 'LOAD_CART', payload: [] });
      }
    } else {
      dispatch({ type: 'LOAD_CART', payload: [] });
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem('nvidia-cart', JSON.stringify(state.items));
    }
  }, [state.items, state.isLoading]);

  // Cart actions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCart = (isOpen) => {
    dispatch({ type: 'TOGGLE_CART', payload: isOpen });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getCartTotal,
    getCartItemsCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};