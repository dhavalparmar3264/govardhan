import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiPlus, FiFilter, FiChevronDown, FiChevronUp, FiX } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Get quantities from cart items
  const getItemQuantity = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };
  
  // Handle add to cart
  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    addToCart(item);
    // Show a small notification or toast that item was added (optional)
    // You can implement a toast notification here if desired
  };
  
  // Calculate total items in cart
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    { 
      id: 'Milk Shake', 
      name: 'Milk Shake',
      description: 'Light bites to begin your meal',
      icon: ''
    },
    { 
      id: 'Raita', 
      name: 'Raita',
      description: 'Hearty and satisfying main dishes',
      icon: ''
    },
    { 
      id: 'Rice', 
      name: 'Rice',
      description: 'Wood-fired Italian Rices',
      icon: ''
    },
    { 
      id: 'Thali', 
      name: 'Thali',
      description: 'Authentic Italian Thali dishes',
      icon: ''
    },
    { 
      id: 'Gujarati Sabzi', 
      name: 'Gujarati Sabzi',
      description: 'Flavorful Gujarati Sabzi cuisine',
      icon: ''
    },
    { 
      id: 'Punjabi Sabzi', 
      name: 'Punjabi Sabzi',
      description: 'Sweet endings to your meal',
      icon: ''
    },
    { 
      id: 'Chinese', 
      name: 'Chinese',
      description: 'Refreshing drinks and more',
      icon: ''
    },
    { 
      id: 'Snacks', 
      name: 'Snacks',
      description: 'Refreshing drinks and more',
      icon: ''
    },
    { 
      id: 'South Indian', 
      name: 'South Indian',
      description: 'Refreshing drinks and more',
      icon: ''
    },
    { 
      id: 'Desserts', 
      name: 'Desserts',
      description: 'Refreshing drinks and more',
      icon: ''
    },
  ];

  const menuItems = [
    // Milk Shake
    {
      id: 1,
      name: 'Chocolate Milkshake',
      description: 'Toasted bread topped with tomatoes, garlic, and fresh basil',
      price: 25,
      category: 'Milk Shake',
      image: '/images/Chocochips shake.jpg',
     
     
    },
    {
      id: 2,
      name: 'Strawberry MilkShake',
      description: 'Crispy chicken wings with your choice of sauce',
      price: 35,
      category: 'Milk Shake',
      image: '/images/Strawberry shake.jpg',
    
    },
    {
      id: 3,
      name: 'Mango Milkshake',
      description: 'Crispy chicken wings with your choice of sauce',
      price: 35,
      category: 'Milk Shake',
      image: '/images/mango.jpg',
     
     
    },

    // raitu
    {
      id: 3,
      name: 'Boondi Raita',
      description: 'Fresh salmon fillet with lemon butter sauce and seasonal vegetables',
      price: 75,
      category: 'Raita',
      image: '/images/boondi.jpg',
  
     
    },
    {
      id: 4,
      name: 'Cucumber Raita',
      description: 'Creamy arborio rice with wild mushrooms and parmesan',
      price: 45,
      category: 'Raita',
      image: '/images/cucumber.jpg',
 
    },

    // Rice
    {
      id: 5,
      name: 'Jeera Rice',
      description: 'Classic Rice with tomato sauce, fresh mozzarella, and basil',
      price: 5,
      category: 'Rice',
      image: '/images/jeera.jpg',
     
    },
    {
      id: 6,
      name: 'Pulav',
      description: 'Classic Rice topped with spicy pepperoni and extra cheese',
      price: 65,
      category: 'Rice',
      image: '/images/pulav.jpg',
     
    },

    // Thali
    {
      id: 7,
      name: 'Gujarati Thali',
      description: 'Classic Italian Thali with creamy sauce, pancetta, and Parmesan',
      price: 45,
      category: 'Thali',
      image: '/images/guj.jpg',
   
    },
    {
      id: 8,
      name: 'Panjabi Thali',
      description: 'Penne Thali with a spicy tomato sauce, garlic, and red chili flakes',
      price: 40,
      category: 'Thali',
      image: '/images/thal 2.jpg',
    
    },
    {
      id: 9,
      name: 'Sp. Goverthan Thali',
      description: 'Penne Thali with a spicy tomato sauce, garlic, and red chili flakes',
      price: '23',
      category: 'Thali',
      image: '/images/gj.jpg',
    
    },

    // Gujarati Sabzi
    {
      id: 9,
      name: 'Sev Tameta Nu Shaak',
      description: '',
      price: 25,
      category: 'Gujarati Sabzi',
      image: '/images/sav tameta.jpg',
      
    },
    {
      id: 10,
      name: 'Undhiyu',
      description: 'Grilled cottage cheese in a spiced tomato and cream sauce',
      price: 21,
      category: 'Gujarati Sabzi',
      image: '/images/Undhiyu.jpg',
      
    },
    {
      id: 10,
      name: 'Bhindi Masala',
      description: 'Grilled cottage cheese in a spiced tomato and cream sauce',
      price: 23,
      category: 'Gujarati Sabzi',
      image: '/images/Bhindi Masala.jpg',
      
    },

    // Punjabi Sabzi
    {
      id: 11,
      name: 'Paneer Butter Masala',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 22,
      category: 'Punjabi Sabzi',
      image: '/images/panir.jpg',
     
    },
  

    // Chinese
     
    {
      id: 13,
      name: 'Veg Manchurian',
      description: 'Refreshing mint and lime mocktail with soda',
      price: 18,
      category: 'Chinese',
      image: '/images/veg m.jpg',
     
    },
    {
      id: 14,
      name: 'Hakka Noodles',
      description: 'Freshly brewed iced tea with lemon and mint',
      price: 15,
      category: 'Chinese',
      image: '/images/noodles1.jpg',
      
    },
    {
      id: 11,
      name: 'Aloo Gobi',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 28,
      category: 'Chinese',
      image: '/images/panir.jpg',
    
    },
    {
      id: 11,
      name: 'Chole (Chana Masala)',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 23,
      category: 'Punjabi Sabzi',
      image: '/images/chole.jpg',
    
    },

    //snacks

    {
      id: 17,
      name: 'Kachori',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 28,
      category: 'Snacks',
      image: '/images/kachori.jpg',
    
    },
    {
      id: 16,
      name: 'Samosa',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 28,
      category: 'Snacks',
      image: '/images/Samosa.jpg',
    
    },
    

    // South Indian

    {
      id: 18,
      name: 'Dosa',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 28,
      category: 'South Indian',
      image: '/images/dosa.jpg',
    
    },
    {
      id: 19,
      name: 'Idli',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 23,
      category: 'South Indian',
      image: '/images/idli.jpg',
    
    },

    // Desserts

    {
      id: 20,
      name: 'Gulab Jamun',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 24,
      category: 'Desserts',
      image: '/images/Gulab Jabun.jpg',
    },
    {
      id: 21,
      name: 'Jalebi',
      description: 'Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
      price: 21,
      category: 'Desserts',
      image: '/images/Jalebi.jpg',
    },
    

  ];

  // Initialize expanded categories state
  useEffect(() => {
    const initialExpandedState = {};
    categories.forEach(cat => {
      initialExpandedState[cat.id] = true;
    });
    setExpandedCategories(initialExpandedState);
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Filter items based on search query and active category
  const getFilteredItems = (categoryId) => {
    return menuItems.filter(item => {
      const matchesCategory = item.category === categoryId;
      const matchesSearch = searchQuery === '' || 
                          item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  // Check if any items match the search query in any category
  const hasSearchResults = searchQuery === '' || 
    menuItems.some(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Get categories that have items matching the search query
  const visibleCategories = searchQuery === '' 
    ? categories 
    : categories.filter(cat => 
        menuItems.some(item => 
          item.category === cat.id && 
          (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           item.description.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );

  // Filter menu items based on active category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).map(item => ({
    ...item,
    quantity: getItemQuantity(item.id)
  }));

  // Calculate cart total and item count
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-orange-600/90 to-orange-700/90 text-white" style={{
        backgroundImage: ' url("/images/Fast%20Food.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold  text-center mb-4">Our Exquisite Menu</h1>
          <p className="text-lg md:text-xl text-orange-100 max-w-2xl text-center">
            Discover our handcrafted dishes made with the finest  <br/> ingredients and authentic recipes from around the world.
          </p>
        </div>
      </div>

      {/* Sticky Category Navigation */}
      <div className={`sticky top-0 z-10 bg-white shadow-md transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveCategory('all');
              }}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                activeCategory === 'all' 
                  ? 'bg-orange-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  const element = document.getElementById(`category-${category.id}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  setActiveCategory(category.id);
                }}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors flex items-center ${
                  activeCategory === category.id 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Find Your Favorite Dishes</h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for dishes, ingredients, or categories..."
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <FiX className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
          
          
        </div>
      </div>

      {/* Menu Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        {!hasSearchResults ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700">No items found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => setSearchQuery('')}
              className="mt-4 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {visibleCategories.map(category => {
              const categoryItems = getFilteredItems(category.id);
              if (categoryItems.length === 0 && searchQuery) return null;
              
              const isExpanded = expandedCategories[category.id] !== false;
              
              return (
                <div key={category.id} id={`category-${category.id}`} className="scroll-mt-24">
                  <div 
                    className="flex items-center justify-between cursor-pointer mb-6"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <span className="mr-3">{category.icon}</span>
                        {category.name}
                        <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {searchQuery ? categoryItems.length : menuItems.filter(item => item.category === category.id).length} items
                        </span>
                      </h2>
                      <p className="text-gray-500 ml-10 mt-1">{category.description}</p>
                    </div>
                    {isExpanded ? (
                      <FiChevronUp className="text-gray-500 text-xl" />
                    ) : (
                      <FiChevronDown className="text-gray-500 text-xl" />
                    )}
                  </div>
                  
                  {isExpanded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryItems.map(item => (
                        <div 
                          key={item.id} 
                          className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${
                            item.isPopular ? 'border-2 border-orange-300' : 'border-gray-100'
                          }`}
                        >
                          <div className="relative">
                            <div className="h-48 overflow-hidden">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                              />
                            </div>
                            {item.isPopular && (
                              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                Popular
                              </div>
                            )}
                            <div className="absolute top-3 right-3 flex flex-col space-y-2">
                              {item.isVeg && (
                                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  Veg
                                </span>
                              )}
                              {item.isSpicy && (
                                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                  Spicy
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="p-5">
                            <div className="flex justify-between items-start">
                              <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                              <span className="text-lg font-bold text-orange-600">${item.price}</span>
                            </div>
                            
                            <p className="text-gray-600 mt-2 mb-4">{item.description}</p>
                            
                            {item.size && (
                              <div className="mb-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
                                <div className="flex space-x-2">
                                  {item.size.map((size, index) => (
                                    <button 
                                      key={index}
                                      className="px-3 py-1 text-sm border rounded-full hover:bg-orange-50 border-orange-200 text-orange-700"
                                    >
                                      {size}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    // Handle favorite
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100"
                                >
                                 
                                </button>
                               
                              </div>
                              
                              <button
                                onClick={(e) => handleAddToCart(item, e)}
                                className="bg-orange-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center gap-2"
                              >
                                <FiPlus className="text-lg" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <button
        onClick={() => cartItemCount > 0 && navigate('/order')}
        className={`fixed bottom-8 right-8 ${cartItemCount > 0 ? 'bg-orange-600 hover:bg-orange-700' : 'bg-gray-400 cursor-not-allowed'} text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 z-20`}
        aria-label="View cart"
        disabled={cartItemCount === 0}
      >
        <div className="relative">
          <FiShoppingCart className="text-2xl" />
          {cartItemCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
              {cartItemCount}
            </span>
          )}
        </div>
      </button>
    </div>
  );
};

export default Menu;