
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
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
  const [selectedFilling, setSelectedFilling] = useState('');
  const [selectedOblea, setSelectedOblea] = useState('');

  // Tamaños reales del menú con inclusiones
  const sizes = {
    fresas: [
      { 
        id: 'mini', 
        name: 'Mini Fresa 6onz', 
        price: 7000, 
        includes: 'Incluye una salsa',
        saucesIncluded: 1,
        classicToppingsIncluded: 0,
        premiumToppingsIncluded: 0
      },
      { 
        id: 'baby', 
        name: 'Baby Fresa 8onz', 
        price: 10000, 
        includes: 'Incluye una salsa',
        saucesIncluded: 1,
        classicToppingsIncluded: 0,
        premiumToppingsIncluded: 0
      },
      { 
        id: 'muy', 
        name: 'Muy Fresa 10onz', 
        price: 13000, 
        includes: 'Incluye dos salsas y dos toppings clásicos',
        saucesIncluded: 2,
        classicToppingsIncluded: 2,
        premiumToppingsIncluded: 0
      },
      { 
        id: 'super', 
        name: 'Super Fresa 12onz', 
        price: 17000, 
        includes: 'Incluye dos salsas, dos toppings clásicos y uno premium',
        saucesIncluded: 2,
        classicToppingsIncluded: 2,
        premiumToppingsIncluded: 1
      },
      { 
        id: 'frescoloco', 
        name: 'Fresco Loco 24onz', 
        price: 24000, 
        includes: 'Incluye tres salsas, tres toppings clásicos y dos premium',
        saucesIncluded: 3,
        classicToppingsIncluded: 3,
        premiumToppingsIncluded: 2
      }
    ],
    frutas: {
      cerezas: [
        { id: 'baby_cherry', name: 'Baby Cherry', price: 14000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 },
        { id: 'muy_cherry', name: 'Muy Cherry', price: 17000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 },
        { id: 'super_cherry', name: 'Super Cherry', price: 21000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 }
      ],
      duraznos: [
        { id: 'baby_durazno', name: 'Baby Durazno', price: 12000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 },
        { id: 'muy_durazno', name: 'Muy Durazno', price: 14000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 },
        { id: 'super_durazno', name: 'Super Durazno', price: 18000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 }
      ],
      bananos: [
        { id: 'baby_banana', name: 'Baby Banana', price: 9000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 },
        { id: 'muy_banana', name: 'Muy Banana', price: 12000, includes: 'Ninguno incluye topping', saucesIncluded: 0, classicToppingsIncluded: 0, premiumToppingsIncluded: 0 }
      ]
    },
    chocolate: [
      { 
        id: 'choco_baby', 
        name: 'Choco Baby', 
        price: 16000, 
        includes: 'Incluye un topping, puedes elegir',
        saucesIncluded: 0,
        classicToppingsIncluded: 1,
        premiumToppingsIncluded: 0
      },
      { 
        id: 'choco_super', 
        name: 'Choco Super', 
        price: 22000, 
        includes: 'Incluye un topping, puedes elegir',
        saucesIncluded: 0,
        classicToppingsIncluded: 1,
        premiumToppingsIncluded: 0
      }
    ],
    obleas: [
      { 
        id: 'pipona', 
        name: 'Pipona', 
        price: 5500, 
        includes: 'Incluye una oblea, dos salsas, crema y queso',
        saucesIncluded: 2,
        classicToppingsIncluded: 0,
        premiumToppingsIncluded: 0
      },
      { 
        id: 'bichota', 
        name: 'Bichota', 
        price: 8500, 
        includes: 'Incluye dos obleas, dos salsas, crema, queso y fruta',
        saucesIncluded: 2,
        classicToppingsIncluded: 0,
        premiumToppingsIncluded: 0
      },
      { 
        id: 'combi_completa', 
        name: 'Combi Completa', 
        price: 10500, 
        includes: 'Incluye tres obleas, tres salsas, crema, queso, fruta y topping clásico',
        saucesIncluded: 3,
        classicToppingsIncluded: 1,
        premiumToppingsIncluded: 0
      }
    ]
  };

  // Salsas del menú
  const sauces = ['Arequipe', 'Chocolate', 'Mora', 'Cereza', 'Lecherita'];

  // Toppings clásicos para chocolate (precio adicional $2000)
  const toppingsClasicosChocolate = ['Oreo', 'Leche en polvo', 'Milo', 'Maní', 'Crema'];

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
  type FruitType = '' | 'cerezas' | 'duraznos' | 'bananos';

  const [selectedFruitType, setSelectedFruitType] = useState<FruitType>('');  
  const handleIngredientToggle = (ingredient: string, type: string) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const handleSauceToggle = (sauce : string) => {
    if (selectedSauces.includes(sauce)) {
      setSelectedSauces(selectedSauces.filter(s => s !== sauce));
    } else {
      setSelectedSauces([...selectedSauces, sauce]);
    }
  };

  const getCurrentSizeData = () => {
    if (category === 'fresas') {
      return sizes.fresas.find(s => s.id === selectedSize);
    } else if (category === 'frutas' && selectedFruitType && selectedFruitType in sizes.frutas) {
      return sizes.frutas[selectedFruitType]?.find(s => s.id === selectedSize);
    } else if (category === 'chocolate') {
      return sizes.chocolate.find(s => s.id === selectedSize);
    } else if (category === 'obleas') {
      return sizes.obleas.find(s => s.id === selectedOblea);
    }
    return null;
  };

  const calculatePrice = () => {
    const sizeData = getCurrentSizeData();
    if (!sizeData) return 0;

    const basePrice = sizeData.price;
    
    // Calcular salsas extras
    const extraSauces = Math.max(0, selectedSauces.length - sizeData.saucesIncluded);
    const extraSaucesPrice = extraSauces * 0; // Las salsas extras no tienen costo adicional creo
    
    // Calcular toppings clásicos extras
    const availableClassicToppings = category === 'chocolate' ? toppingsClasicosChocolate : toppingsClasicos;
    const selectedClassicToppings = selectedIngredients.filter(i => availableClassicToppings.includes(i));
    const extraClassicToppings = Math.max(0, selectedClassicToppings.length - sizeData.classicToppingsIncluded);
    const extraClassicToppingsPrice = extraClassicToppings * 2000;
    
    // Calcular toppings premium extras
    const selectedPremiumToppings = selectedIngredients.filter(i => toppingsPremium.includes(i));
    const extraPremiumToppings = Math.max(0, selectedPremiumToppings.length - sizeData.premiumToppingsIncluded);
    const extraPremiumToppingsPrice = extraPremiumToppings * 3000;
    
    return basePrice + extraSaucesPrice + extraClassicToppingsPrice + extraPremiumToppingsPrice;
  };

  const getExtraCharges = () => {
    const sizeData = getCurrentSizeData();
    if (!sizeData) return { extraClassic: 0, extraPremium: 0 };

    const availableClassicToppings = category === 'chocolate' ? toppingsClasicosChocolate : toppingsClasicos;
    const selectedClassicToppings = selectedIngredients.filter(i => availableClassicToppings.includes(i));
    const extraClassic = Math.max(0, selectedClassicToppings.length - sizeData.classicToppingsIncluded);
    
    const selectedPremiumToppings = selectedIngredients.filter(i => toppingsPremium.includes(i));
    const extraPremium = Math.max(0, selectedPremiumToppings.length - sizeData.premiumToppingsIncluded);
    
    return { extraClassic, extraPremium };
  };

  const handleAddToCart = () => {
    const product = {
      category,
      size: selectedSize,
      fruitType: selectedFruitType,
      ingredients: selectedIngredients,
      sauces: selectedSauces,
      filling: selectedFilling,
      oblea: selectedOblea,
      price: calculatePrice(),
      sizeName: category === 'fresas' ? sizes.fresas.find(s => s.id === selectedSize)?.name : 
                category === 'frutas' && selectedFruitType
  ? sizes.frutas[selectedFruitType]?.find(s => s.id === selectedSize)?.name
  : 
                category === 'chocolate' ? sizes.chocolate.find(s => s.id === selectedSize)?.name :
                category === 'obleas' ? sizes.obleas.find(s => s.id === selectedOblea)?.name : ''
    };
    onAddToCart(product);
    
    // Reset form
    setSelectedSize('');
    setSelectedIngredients([]);
    setSelectedFruits([]);
    setSelectedSauces([]);
    setSelectedFilling('');
    setSelectedFruitType('');
    setSelectedOblea('');
  };

  const getCategoryTitle = () => {
    switch(category) {
      case 'fresas': return 'Fresas con Crema';
      case 'frutas': return 'Otras Frutas con Crema';
      case 'chocolate': return 'Fresas con Chocolate';
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
    if (category === 'chocolate') {
      return selectedSize;
    }
    if (category === 'obleas') {
      return selectedOblea;
    }
    return false;
  };

  const sizeData = getCurrentSizeData();
  const extraCharges = getExtraCharges();

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-pink-50 to-red-50" suppressHydrationWarning={true}>
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
                          onChange={(e) => setSelectedFruitType(e.target.value as FruitType)}
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
                      onChange={(e) => setSelectedFruitType(e.target.value as FruitType)}
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
                      onChange={(e) => setSelectedFruitType(e.target.value as FruitType)}
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
                      onChange={(e) => setSelectedFruitType(e.target.value as FruitType)}
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

          {/* Fresas con chocolate */}
          {category === 'chocolate' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Tamaños</h3>
              <div className="space-y-3">
                {sizes.chocolate.map((size) => (
                  <label
                    key={size.id}
                    className={`flex flex-col p-4 rounded-lg transition-colors cursor-pointer ${
                      selectedSize === size.id ? 'bg-amber-100 border-2 border-amber-300' : 'bg-gray-50 hover:bg-gray-100'
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
                          className="text-amber-500"
                        />
                        <span className="font-medium text-gray-700">{size.name}</span>
                      </div>
                      <span className="text-amber-600 font-semibold">${size.price.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-amber-500 font-medium ml-6">{size.includes}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Obleas */}
          {category === 'obleas' && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Opciones de Obleas</h3>
              <div className="space-y-3">
                {sizes.obleas.map((oblea) => (
                  <label
                    key={oblea.id}
                    className={`flex flex-col p-4 rounded-lg transition-colors cursor-pointer ${
                      selectedOblea === oblea.id ? 'bg-pink-100 border-2 border-pink-300' : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="oblea"
                          value={oblea.id}
                          checked={selectedOblea === oblea.id}
                          onChange={(e) => setSelectedOblea(e.target.value)}
                          className="text-pink-500"
                        />
                        <span className="font-medium text-gray-700">{oblea.name}</span>
                      </div>
                      <span className="text-pink-600 font-semibold">${oblea.price.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-pink-500 font-medium ml-6">{oblea.includes}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Salsas */}
          {(category === 'fresas' || category === 'frutas' || category === 'obleas') && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Salsas
                {sizeData && sizeData.saucesIncluded > 0 && (
                  <span className="text-sm text-pink-500 font-normal ml-2">
                    ({sizeData.saucesIncluded} incluidas)
                  </span>
                )}
              </h3>
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
          {(category === 'fresas' || category === 'frutas' || category === 'chocolate' || category === 'obleas') && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Toppings Clásicos
                {sizeData && sizeData.classicToppingsIncluded > 0 && (
                  <span className="text-sm text-pink-500 font-normal ml-2">
                    ({sizeData.classicToppingsIncluded} incluidos)
                  </span>
                )}
                {extraCharges.extraClassic > 0 && (
                  <span className="text-sm text-orange-500 font-normal ml-2">
                    (+{extraCharges.extraClassic} extras: ${extraCharges.extraClassic * 2000})
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {(category === 'chocolate' ? toppingsClasicosChocolate : toppingsClasicos).map((topping) => (
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
          {(category === 'fresas' || category === 'frutas' || category === 'chocolate' || category === 'obleas') && (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Toppings Premium
                {sizeData && sizeData.premiumToppingsIncluded > 0 && (
                  <span className="text-sm text-pink-500 font-normal ml-2">
                    ({sizeData.premiumToppingsIncluded} incluidos)
                  </span>
                )}
                {extraCharges.extraPremium > 0 && (
                  <span className="text-sm text-orange-500 font-normal ml-2">
                    (+{extraCharges.extraPremium} extras: ${extraCharges.extraPremium * 3000})
                  </span>
                )}
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
                   category === 'frutas' && selectedFruitType
                    ? sizes.frutas[selectedFruitType]?.find(s => s.id === selectedSize)?.name
  :  
                   category === 'chocolate' ? sizes.chocolate.find(s => s.id === selectedSize)?.name : ''}
                </span>
              </div>
            )}

            {selectedOblea && (
              <div className="flex justify-between">
                <span className="text-gray-600">Oblea:</span>
                <span className="font-medium">
                  {sizes.obleas.find(s => s.id === selectedOblea)?.name}
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

            {/* Mostrar desglose de precios */}
            {sizeData && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Precio base:</span>
                  <span>${sizeData.price.toLocaleString()}</span>
                </div>
                {extraCharges.extraClassic > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Toppings clásicos extras ({extraCharges.extraClassic}):</span>
                    <span>+${(extraCharges.extraClassic * 2000).toLocaleString()}</span>
                  </div>
                )}
                {extraCharges.extraPremium > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Toppings premium extras ({extraCharges.extraPremium}):</span>
                    <span>+${(extraCharges.extraPremium * 3000).toLocaleString()}</span>
                  </div>
                )}
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
