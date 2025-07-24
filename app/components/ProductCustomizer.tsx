'use client';

import { useState } from 'react';

interface ProductCustomizerProps {
  category: string;
  onBackToCategories: () => void;
  onAddToCart: (product: any) => void;
  onViewCart: () => void;
  cartCount: number;
}

export default function ProductCustomizer({ 
  category, 
  onBackToCategories, 
  onAddToCart, 
  onViewCart, 
  cartCount 
}: ProductCustomizerProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState([]);
  const [selectedFilling, setSelectedFilling] = useState('');

  // Tamaños reales del menú
  const sizes = {
    fresas: [
      { id: 'mini', name: 'Mini Fresa 6onz', price: 7000, includes: 'Incluye una salsa' },
      { id: 'baby', name: 'Baby Fresa 8onz', price: 10000, includes: 'Incluye una salsa' },
      { id: 'muy', name: 'Muy Fresa 10onz', price: 13000, includes: 'Incluye dos salsas y dos toppings clásicos' },
      { id: 'super', name: 'Super Fresa 12onz', price: 17000, includes: 'Incluye dos salsas, dos toppings clásicos y uno premium' },
      { id: 'frescoloco', name: 'Fresco Loco 24onz', price: 24000, includes: 'Incluye tres salsas, tres toppings clásicos y dos premium' }
    ],
    frutas: {
      cerezas: [
        { id: 'baby_cherry', name: 'Baby Cherry', price: 14000, includes: 'Ninguno incluye topping' },
        { id: 'muy_cherry', name: 'Muy Cherry', price: 17000, includes: 'Ninguno incluye topping' },
        { id: 'super_cherry', name: 'Super Cherry', price: 21000, includes: 'Ninguno incluye topping' }
      ],
      duraznos: [
        { id: 'baby_durazno', name: 'Baby Durazno', price: 12000, includes: 'Ninguno incluye topping' },
        { id: 'muy_durazno', name: 'Muy Durazno', price: 14000, includes: 'Ninguno incluye topping' },
        { id: 'super_durazno', name: 'Super Durazno', price: 18000, includes: 'Ninguno incluye topping' }
      ],
      bananos: [
        { id: 'baby_banana', name: 'Baby Banana', price: 9000, includes: 'Ninguno incluye topping' },
        { id: 'muy_banana', name: 'Muy Banana', price: 12000, includes: 'Ninguno incluye topping' }
      ]
    }
  };

  // Salsas del menú
  const sauces = ['Arequipe', 'Chocolate', 'Mora', 'Cereza', 'Lecherita'];

  // Toppings clásicos (precio adicional $2000)
  const toppingsClasicos = [
    'Oreo', 'Milo', 'Piazza', 'Maní', 'Quipitos', 'Granola', 'Gomitas',
    'Chocmelos', 'Quimbaya', 'Zucaritas', 'Leche en polvo', 'Chocokrispia',
    'Lluvia de chocolate'
  ];

  // Toppings premium (precio adicional $3000)
  const toppingsPremium = [
    'Queso', 'Duraznos', 'Brownie', 'Cerezas', 'Nutella', 'Perlas explosivas',
    'M&M', 'Helado', 'Burhum', 'Minichips', 'Chocorramo', 'Jumbo Maní',
    'Baño de chocolate'
  ];

  const [selectedFruitType, setSelectedFruitType] = useState('');

  const handleIngredientToggle = (ingredient, type) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleSauceToggle = (sauce) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter(s => s !== sauce));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const calculatePrice = () => {
    if (category === 'fresas') {
      const basePrice = sizes.fresas.find(s => s.id === selectedSize)?.price || 0;
      const clasicosPrice = selectedIngredients.filter(i => toppingsClasicos.includes(i)).length * 2000;
      const premiumPrice = selectedIngredients.filter(i => toppingsPremium.includes(i)).length * 3000;
      return basePrice + clasicosPrice + premiumPrice;
    } else if (category === 'frutas') {
      const fruitSizes = sizes.frutas[selectedFruitType] || [];
      const basePrice = fruitSizes.find(s => s.id === selectedSize)?.price || 0;
      const clasicosPrice = selectedIngredients.filter(i => toppingsClasicos.includes(i)).length * 2000;
      const premiumPrice = selectedIngredients.filter(i => toppingsPremium.includes(i)).length * 3000;
      return basePrice + clasicosPrice + premiumPrice;
    }
    return 0;
  };

  const handleAddToCart = () => {
    const product = {
      category,
      size: selectedSize,
      fruitType: selectedFruitType,
      ingredients: selectedIngredients,
      sauces: selectedSauces,
      filling: selectedFilling,
      price: calculatePrice(),
      sizeName: category === 'fresas' ? sizes.fresas.find(s => s.id === selectedSize)?.name : 
                category === 'frutas' ? sizes.frutas[selectedFruitType]?.find(s => s.id === selectedSize)?.name : ''
    };
    onAddToCart(product);
    
    // Reset form
    setSelectedSize('');
    setSelectedIngredients([]);
    setSelectedFruits([]);
    setSelectedSauces([]);
    setSelectedFilling('');
    setSelectedFruitType('');
  };

  const getCategoryTitle = () => {
    switch(category) {
      case 'fresas': return 'Fresas con Crema';
      case 'frutas': return 'Otras Frutas con Crema';
      case 'obleas': return 'Obleas';
      default: return '';
    }
  };

  const isFormValid = () => {
    if (category === 'fresas') {
      return selectedSize;
    }
    if (category === 'frutas') {
      return selectedSize && selectedFruitType;
    }
    if (category === 'obleas') {
      return selectedFilling;
    }
    return false;
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-pink-50 to-red-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToCategories}
            className="bg-gray-200 text-gray-700 p-3 rounded-full hover:bg-gray-300 transition-colors cursor-pointer"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-arrow-left-line text-xl"></i>
            </div>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: 'Pacifico, serif' }}>
            {getCategoryTitle()}
          </h1>
          
          <button
            onClick={onViewCart}
            className="bg-pink-400 text-white p-3 rounded-full shadow-lg hover:bg-pink-500 transition-colors cursor-pointer relative"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-shopping-cart-line text-xl"></i>
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left side - Configuration */}
        <div className="space-y-6">
          {/* Fresas con crema */}
          {category === 'fresas' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tamaños</h3>
              <div className="space-y-3">
                {sizes.fresas.map((size) => (
                  <label
                    key={size.id}
                    className={`flex flex-col p-4 rounded-lg transition-colors cursor-pointer ${
                      selectedSize === size.id ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="size"
                          value={size.id}
                          checked={selectedSize === size.id}
                          onChange={(e) => setSelectedSize(e.target.value)}
                          className="text-pink-500"
                        />
                        <span className="font-medium text-gray-700">{size.name}</span>
                      </div>
                      <span className="text-pink-600 font-semibold">${size.price.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-pink-500 font-medium ml-6">{size.includes}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Otras frutas con crema */}
          {category === 'frutas' && (
            <>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tipo de Fruta</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="fruitType"
                      value="cerezas"
                      checked={selectedFruitType === 'cerezas'}
                      onChange={(e) => setSelectedFruitType(e.target.value)}
                      className="text-pink-500"
                    />
                    <span className="font-medium text-gray-700">Cerezas</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="fruitType"
                      value="duraznos"
                      checked={selectedFruitType === 'duraznos'}
                      onChange={(e) => setSelectedFruitType(e.target.value)}
                      className="text-pink-500"
                    />
                    <span className="font-medium text-gray-700">Duraznos</span>
                  </label>
                  <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <input
                      type="radio"
                      name="fruitType"
                      value="bananos"
                      checked={selectedFruitType === 'bananos'}
                      onChange={(e) => setSelectedFruitType(e.target.value)}
                      className="text-pink-500"
                    />
                    <span className="font-medium text-gray-700">Bananos</span>
                  </label>
                </div>
              </div>

              {selectedFruitType && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Tamaños</h3>
                  <div className="space-y-3">
                    {sizes.frutas[selectedFruitType].map((size) => (
                      <label
                        key={size.id}
                        className={`flex flex-col p-4 rounded-lg transition-colors cursor-pointer ${
                          selectedSize === size.id ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="size"
                              value={size.id}
                              checked={selectedSize === size.id}
                              onChange={(e) => setSelectedSize(e.target.value)}
                              className="text-pink-500"
                            />
                            <span className="font-medium text-gray-700">{size.name}</span>
                          </div>
                          <span className="text-pink-600 font-semibold">${size.price.toLocaleString()}</span>
                        </div>
                        <span className="text-sm text-pink-500 font-medium ml-6">{size.includes}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Salsas */}
          {(category === 'fresas' || category === 'frutas') && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Salsas</h3>
              <div className="grid grid-cols-2 gap-3">
                {sauces.map((sauce) => (
                  <label
                    key={sauce}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedSauces.includes(sauce) ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedSauces.includes(sauce)}
                      onChange={() => handleSauceToggle(sauce)}
                      className="text-pink-500"
                    />
                    <span className="font-medium text-gray-700">{sauce}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Toppings Clásicos */}
          {(category === 'fresas' || category === 'frutas') && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Toppings Clásicos (+$2.000 c/u)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {toppingsClasicos.map((topping) => (
                  <label
                    key={topping}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedIngredients.includes(topping) ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(topping)}
                      onChange={() => handleIngredientToggle(topping, 'clasico')}
                      className="text-pink-500"
                    />
                    <span className="font-medium text-gray-700">{topping}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Toppings Premium */}
          {(category === 'fresas' || category === 'frutas') && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Toppings Premium (+$3.000 c/u)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {toppingsPremium.map((topping) => (
                  <label
                    key={topping}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      selectedIngredients.includes(topping) ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIngredients.includes(topping)}
                      onChange={() => handleIngredientToggle(topping, 'premium')}
                      className="text-pink-500"
                    />
                    <span className="font-medium text-gray-700">{topping}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right side - Summary */}
        <div className="bg-white rounded-xl p-6 shadow-lg h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen del Pedido</h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Producto:</span>
              <span className="font-medium">{getCategoryTitle()}</span>
            </div>
            
            {selectedFruitType && (
              <div className="flex justify-between">
                <span className="text-gray-600">Fruta:</span>
                <span className="font-medium">{selectedFruitType}</span>
              </div>
            )}
            
            {selectedSize && (
              <div className="flex justify-between">
                <span className="text-gray-600">Tamaño:</span>
                <span className="font-medium">
                  {category === 'fresas' ? sizes.fresas.find(s => s.id === selectedSize)?.name : 
                   category === 'frutas' ? sizes.frutas[selectedFruitType]?.find(s => s.id === selectedSize)?.name : ''}
                </span>
              </div>
            )}
            
            {selectedSauces.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Salsas:</span>
                <span className="font-medium">{selectedSauces.join(', ')}</span>
              </div>
            )}
            
            {selectedIngredients.length > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Toppings:</span>
                <span className="font-medium">{selectedIngredients.join(', ')}</span>
              </div>
            )}
          </div>
          
          <div className="border-t pt-4 mb-6">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-pink-600">${calculatePrice().toLocaleString()}</span>
            </div>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={!isFormValid()}
            className={`w-full py-3 px-6 rounded-full font-semibold whitespace-nowrap cursor-pointer transition-all duration-300 ${
              isFormValid()
                ? 'bg-gradient-to-r from-pink-400 to-red-400 text-white hover:from-pink-500 hover:to-red-500 shadow-lg hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Agregar al Carrito
          </button>
        </div>
      </div>
    </div>
  );
}