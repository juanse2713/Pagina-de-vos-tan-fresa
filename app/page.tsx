
'use client';

import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CategorySelector from './components/CategorySelector';
import ProductCustomizer from './components/ProductCustomizer';
import Cart from './components/Cart';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);

  const handleStartOrder = () => {
    setCurrentScreen('categories');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('customize');
  };

  const handleBackToCategories = () => {
    setCurrentScreen('categories');
  };

  const handleAddToCart = (product) => {
    setCart([...cart, { ...product, id: Date.now() }]);
  };

  const handleViewCart = () => {
    setCurrentScreen('cart');
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50">
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStartOrder={handleStartOrder} />
      )}
      
      {currentScreen === 'categories' && (
        <CategorySelector 
          onCategorySelect={handleCategorySelect}
          onViewCart={handleViewCart}
          cartCount={cart.length}
        />
      )}
      
      {currentScreen === 'customize' && (
        <ProductCustomizer 
          category={selectedCategory}
          onBackToCategories={handleBackToCategories}
          onAddToCart={handleAddToCart}
          onViewCart={handleViewCart}
          cartCount={cart.length}
        />
      )}
      
      {currentScreen === 'cart' && (
        <Cart 
          cart={cart}
          onBackToCategories={handleBackToCategories}
          onRemoveFromCart={handleRemoveFromCart}
        />
      )}
    </div>
  );
}
