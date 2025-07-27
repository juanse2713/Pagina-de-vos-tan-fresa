
'use client';

import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import CategorySelector from './components/CategorySelector';
import ProductCustomizer from './components/ProductCustomizer';
import Cart from './components/Cart';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-200 to-red-200 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-heart-fill text-2xl text-red-500"></i>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Pacifico, serif' }}>
            Vos Tan Fresa
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50" suppressHydrationWarning={true}>
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