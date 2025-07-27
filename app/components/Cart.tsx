
'use client';

import { useState } from 'react';

interface CartProps {
  cart: any[];
  onBackToCategories: () => void;
  onRemoveFromCart: (id: number) => void;
}

export default function Cart({ cart, onBackToCategories, onRemoveFromCart }: CartProps) {
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [deliveryData, setDeliveryData] = useState({
    name: '',
    address: '',
    reference: '',
    phone: ''
  });

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const getCategoryName = (category: string) => {
    switch(category) {
      case 'fresas': return 'Fresas con Crema';
      case 'frutas': return 'Otras Frutas con Crema';
      case 'chocolate': return 'Fresas con Chocolate';
      case 'obleas': return 'Obleas';
      default: return '';
    }
  };

  const handleFinishOrder = () => {
    if (!deliveryData.name || !deliveryData.address || !deliveryData.phone) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const orderSummary = cart.map(item => {
      let summary = `${getCategoryName(item.category)}`;
      if (item.sizeName) summary += ` - ${item.sizeName}`;
      if (item.fruitType) summary += ` (${item.fruitType})`;
      if (item.sauces && item.sauces.length > 0) summary += ` - Salsas: ${item.sauces.join(', ')}`;
      if (item.ingredients && item.ingredients.length > 0) summary += ` - Toppings: ${item.ingredients.join(', ')}`;
      summary += ` - $${item.price.toLocaleString()}`;
      return summary;
    }).join('\n');

    const deliveryInfo = ` DATOS DE ENTREGA:
Nombre: ${deliveryData.name}
Dirección: ${deliveryData.address}
${deliveryData.reference ? `Referencia: ${deliveryData.reference}
` : ''}
Teléfono: ${deliveryData.phone}
`;

    const message = ` PEDIDO VOS TAN FRESA 
${orderSummary}

TOTAL: $${getTotalPrice().toLocaleString()}
${deliveryInfo}
¡Gracias por tu pedido!`;
    
    const whatsappNumber = '573044547498';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    if (typeof window !== 'undefined') {
      window.open(whatsappURL, '_blank');
    }
  };

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
            Mi Carrito
          </h1>
          
          <div className="w-12 h-12"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 flex items-center justify-center">
                <i className="ri-shopping-cart-line text-4xl text-gray-400"></i>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Tu carrito está vacío
            </h2>
            <p className="text-gray-500 mb-8">
              Agrega algunos productos deliciosos para comenzar tu pedido
            </p>
            <button
              onClick={onBackToCategories}
              className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-semibold py-3 px-8 rounded-full hover:from-pink-500 hover:to-red-500 transition-all duration-300 whitespace-nowrap cursor-pointer"
            >
              Explorar Productos
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Cart items */}
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {getCategoryName(item.category)}
                      </h3>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        {item.sizeName && (
                          <p><span className="font-medium">Tamaño:</span> {item.sizeName}</p>
                        )}
                        {item.fruitType && (
                          <p><span className="font-medium">Fruta:</span> {item.fruitType}</p>
                        )}
                        {item.filling && (
                          <p><span className="font-medium">Relleno:</span> {item.filling}</p>
                        )}
                        {item.sauces && item.sauces.length > 0 && (
                          <p><span className="font-medium">Salsas:</span> {item.sauces.join(', ')}</p>
                        )}
                        {item.ingredients && item.ingredients.length > 0 && (
                          <p><span className="font-medium">Toppings:</span> {item.ingredients.join(', ')}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-semibold text-pink-600">
                        ${item.price.toLocaleString()}
                      </span>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                      >
                        <div className="w-5 h-5 flex items-center justify-center">
                          <i className="ri-delete-bin-line"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resumen del Pedido
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Productos ({cart.length}):</span>
                  <span className="font-medium">${getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-pink-600">${getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {!showDeliveryForm ? (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowDeliveryForm(true)}
                    className="w-full bg-gradient-to-r from-pink-400 to-red-400 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-500 hover:to-red-500 transition-all duration-300 whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-whatsapp-line text-xl"></i>
                    </div>
                    <span>Realizar Pedido</span>
                  </button>
                  
                  <button
                    onClick={onBackToCategories}
                    className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Seguir Comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Datos de Entrega
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de quien recibe *
                      </label>
                      <input
                        type="text"
                        value={deliveryData.name}
                        onChange={(e) => setDeliveryData({...deliveryData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ingresa el nombre"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dirección *
                      </label>
                      <input
                        type="text"
                        value={deliveryData.address}
                        onChange={(e) => setDeliveryData({...deliveryData, address: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ingresa la dirección completa"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Punto de referencia
                      </label>
                      <input
                        type="text"
                        value={deliveryData.reference}
                        onChange={(e) => setDeliveryData({...deliveryData, reference: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ej: Cerca del parque, frente a la tienda..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de contacto *
                      </label>
                      <input
                        type="tel"
                        value={deliveryData.phone}
                        onChange={(e) => setDeliveryData({...deliveryData, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="Ej: 3001234567"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-6">
                    <button
                      onClick={() => setShowDeliveryForm(false)}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-full hover:bg-gray-300 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleFinishOrder}
                      className="flex-1 bg-gradient-to-r from-pink-400 to-red-400 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-500 hover:to-red-500 transition-all duration-300 whitespace-nowrap cursor-pointer"
                    >
                      Enviar Pedido
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}