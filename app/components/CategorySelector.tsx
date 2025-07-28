'use client';

export type Category = 'fresas' | 'frutas' | 'chocolate' | 'obleas' | '';

type CategoryItem = {
  id: Category; // ← Asegura que sea un valor válido
  name: string;
  description: string;
  image: string;
  bgColor: string;
};

interface CategorySelectorProps {
  onCategorySelect: (category: Category) => void;
  onViewCart: () => void;
  cartCount: number;
}

export default function CategorySelector({ onCategorySelect, onViewCart, cartCount }: CategorySelectorProps) {
  const categories: CategoryItem[] = [
    {
      id: 'fresas',
      name: 'Fresas con Crema',
      description: 'Fresas frescas con deliciosa crema y tus ingredientes favoritos',
      image: '/images/fresa1.png',
      bgColor: 'bg-pink-50',
    },
    {
      id: 'frutas',
      name: 'Otras Frutas con Crema',
      description: 'Cerezas, duraznos, bananos con crema y salsas especiales',
      image: '/images/fresa2.png',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'chocolate',
      name: 'Fresas con Chocolate',
      description: 'Fresas frescas bañadas en delicioso chocolate con toppings',
      image: '/images/fresa3.png',
      bgColor: 'bg-amber-50',
    },
    {
      id: 'obleas',
      name: 'Obleas',
      description: 'Obleas crujientes con rellenos deliciosos y ingredientes extra',
      image: '/images/fresa1.png',
      bgColor: 'bg-yellow-50',
    },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div className="text-center flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Pacifico, serif' }}>
              Vos Tan Fresa
            </h1>
            <p className="text-gray-600">Elige tu categoría favorita</p>
          </div>

          {/* Cart button */}
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

      {/* Categories grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`${category.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105`}
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="text-center">
                {/* Imagen */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="mx-auto w-20 h-20 object-cover rounded-full shadow-md mb-4"
                />

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">{category.name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{category.description}</p>

                {/* Select button */}
                <button className="bg-pink-400 text-white font-semibold py-2 px-6 rounded-full hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                  Seleccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-100 to-transparent pointer-events-none opacity-30"></div>
    </div>
  );
}