
'use client';

interface WelcomeScreenProps {
  onStartOrder: () => void;
}

export default function WelcomeScreen({ onStartOrder }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-pink-200 rounded-full opacity-60"></div>
        <div className="absolute top-40 right-20 w-12 h-12 bg-red-200 rounded-full opacity-70"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-pink-100 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-14 h-14 bg-red-100 rounded-full opacity-60"></div>
      </div>

      {/* Main content */}
      <div className="text-center z-10 max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-200 to-red-200 rounded-full flex items-center justify-center shadow-lg mb-4">
            <div className="w-6 h-6 flex items-center justify-center">
              <i className="ri-heart-fill text-4xl text-red-500"></i>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
            Vos Tan Fresa
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            Postres frescos y deliciosos
          </p>
        </div>

        {/* Welcome message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            ¡Bienvenido a nuestro catálogo!
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Descubre nuestros deliciosos postres hechos con amor. 
            Fresas frescas, frutas jugosas y obleas crujientes te esperan.
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={onStartOrder}
          className="bg-gradient-to-r from-pink-400 to-red-400 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:from-pink-500 hover:to-red-500 transform hover:scale-105 transition-all duration-300 whitespace-nowrap cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-shopping-cart-line"></i>
            </div>
            <span>Empezar Pedido</span>
          </div>
        </button>
      </div>

      {/* Decorative fruits */}
      <div className="absolute bottom-10 left-10 opacity-20">
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="ri-heart-fill text-4xl text-pink-400"></i>
        </div>
      </div>
      <div className="absolute top-10 right-10 opacity-20">
        <div className="w-8 h-8 flex items-center justify-center">
          <i className="ri-heart-fill text-4xl text-red-400"></i>
        </div>
      </div>
    </div>
  );
}
