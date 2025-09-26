import React, { useState, useEffect } from 'react';
import { Clock, Package, MapPin, Star, ChevronRight, Calendar, CheckCircle, Truck, ChefHat, Bike, CheckCircle2, Search, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, totalItems } = useCart();
  const [activeTab, setActiveTab] = useState('cart'); // Cart is default
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const navigate = useNavigate();

  // Removed the useEffect that was switching to 'empty' tab
  // Now cart tab will always remain as default and show empty state within it

  const handlePlaceOrder = () => {
    setIsPlacingOrder(true);
    // Simulate order processing
    setTimeout(() => {
      clearCart();
      // Don't switch tabs automatically, let user stay on cart tab
      setIsPlacingOrder(false);
    }, 2000);
  };

  const orders = {
    cart: {
      items: cartItems,
      total: totalPrice,
      itemCount: totalItems
    },
    upcoming: [
      // Sample upcoming orders...
    ],
    past: [
      // Sample past orders...
    ]
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'preparing':
        return {
          icon: <ChefHat className="w-5 h-5 text-orange-600" />,
          text: 'Preparing your order',
          color: 'bg-orange-50 text-orange-800 border border-orange-200',
          progress: 50
        };
      case 'on_way':
        return {
          icon: <Bike className="w-5 h-5 text-orange-500" />,
          text: 'On the way',
          color: 'bg-orange-50 text-orange-800 border border-orange-200',
          progress: 80
        };
      case 'delivered':
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
          text: 'Delivered',
          color: 'bg-green-50 text-green-800 border border-green-200',
          progress: 100
        };
      default:
        return {
          icon: <Package className="w-5 h-5 text-gray-400" />,
          text: 'Order Placed',
          color: 'bg-gray-50 text-gray-600 border border-gray-200',
          progress: 20
        };
    }
  };

  const filteredOrders = activeTab === 'upcoming' 
    ? orders.upcoming.filter(order => 
        order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : orders.past.filter(order => 
        order.restaurant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-white">
            {activeTab === 'cart' ? 'Your Cart' : activeTab === 'upcoming' ? 'My Orders' : 'Order History'}
          </h1>
          <p className="mt-2 text-orange-100">
            {activeTab === 'cart' 
              ? 'Review and manage your order' 
              : activeTab === 'upcoming' 
                ? 'Track your current and upcoming orders' 
                : 'View your past orders and reorder your favorites'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        

        {/* Tabs */}
        <div className="bg-white p-2 rounded-lg shadow-sm mb-6">
          <nav className="flex space-x-2">
            <button
              onClick={() => setActiveTab('cart')}
              className={`px-4 py-2.5 rounded-md font-medium text-sm flex items-center ${
                activeTab === 'cart'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Your Cart
              {totalItems > 0 && (
                <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                  activeTab === 'cart' ? 'bg-white/20' : 'bg-orange-100 text-orange-800'
                }`}>
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-2.5 rounded-md font-medium text-sm flex items-center ${
                activeTab === 'past'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-orange-50'
              }`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Past Orders
              <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded-full ${
                activeTab === 'past' ? 'bg-white/20' : 'bg-orange-100 text-orange-800'
              }`}>
                {orders.past.length}
              </span>
            </button>
          </nav>
        </div>

        {/* Cart Items */}
        {activeTab === 'cart' && (
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden mb-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-orange-800 mb-2">Your cart is empty</h3>
                <p className="text-orange-600 mb-6">Add some delicious items to get started!</p>
                <button 
                  onClick={() => navigate('/menu')}
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="px-6 py-4 border-b border-orange-100">
                  <h2 className="text-lg font-semibold text-gray-900">Your Order</h2>
                </div>
                <div className="divide-y divide-orange-100">
                  {cartItems.map((item) => (
                    <div key={item.id} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-orange-50 rounded-lg overflow-hidden mr-4">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-orange-600 font-medium">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-4 border-t border-orange-100 bg-orange-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-medium text-gray-900">₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Delivery Fee</span>
                    <span className="font-medium text-gray-900">₹0</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-semibold text-orange-700 border-t border-orange-100 pt-4 mt-4">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="w-full mt-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isPlacingOrder ? 'Placing Order...' : 'Proceed to Checkout'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
        {/* Orders List */}
        <div className="space-y-6">
          {(activeTab === 'upcoming' || activeTab === 'past') && filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-orange-100">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-orange-800 mb-2">
                {activeTab === 'upcoming' ? 'No upcoming orders' : 'No past orders'}
              </h3>
              <p className="text-orange-600 max-w-md mx-auto">
                {activeTab === 'upcoming' 
                  ? 'You don\'t have any current or upcoming orders.'
                  : 'Your past orders will appear here.'}
              </p>
              <button 
                onClick={() => navigate('/menu')}
                className="mt-6 px-6 py-2.5 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => {
              const status = getStatusDetails(order.status);
              
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  {/* Order Header */}
                  <div className="px-6 py-4 border-b border-orange-100 bg-gradient-to-r from-orange-50 to-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.restaurant}</h3>
                        <p className="text-sm text-gray-500">Order #{order.id} • {order.orderTime}</p>
                      </div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                        {status.icon}
                        <span className="ml-1.5">{status.text}</span>
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="px-6 py-4 bg-white">
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2"></div>
                            <span className="text-gray-700">
                              {item.quantity}x {item.name}
                            </span>
                          </div>
                          <span className="text-gray-900 font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 pt-4 border-t border-orange-100">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="text-lg font-bold text-gray-900">₹{order.total}</p>
                        </div>
                        <div className="flex space-x-2">
                          {order.status === 'delivered' ? (
                            <>
                              <button className="px-4 py-2 border border-orange-300 rounded-lg text-orange-600 font-medium text-sm hover:bg-orange-50 transition-colors">
                                Rate & Review
                              </button>
                              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm hover:bg-orange-700 transition-colors">
                                Reorder
                              </button>
                            </>
                          ) : (
                            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg font-medium text-sm hover:bg-orange-700 transition-colors">
                              Track Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Delivery Progress */}
                    {order.status !== 'delivered' && (
                      <div className="mt-6 pt-4 border-t border-orange-100">
                        <div className="mb-2 flex justify-between text-sm text-gray-600">
                          <span>Order Status</span>
                          <span className="font-medium">{status.progress}% Complete</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-orange-600 h-2 rounded-full transition-all duration-500 ease-in-out" 
                            style={{ width: `${status.progress}%` }}
                          ></div>
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-4 text-center text-xs">
                          <div className={`${status.progress >= 25 ? 'text-orange-700' : 'text-gray-400'}`}>
                            <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${status.progress >= 25 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-300'}`}>
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Order Confirmed</span>
                          </div>
                          <div className={`${status.progress >= 50 ? 'text-orange-700' : 'text-gray-400'}`}>
                            <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${status.progress >= 50 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-300'}`}>
                              <ChefHat className="w-4 h-4" />
                            </div>
                            <span className="font-medium">Preparing</span>
                          </div>
                          <div className={`${status.progress >= 100 ? 'text-orange-700' : 'text-gray-400'}`}>
                            <div className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center mb-2 ${status.progress >= 100 ? 'bg-orange-100 text-orange-600' : 'bg-gray-50 text-gray-300'}`}>
                              <Bike className="w-4 h-4" />
                            </div>
                            <span className="font-medium">{order.status === 'on_way' ? 'On the way' : 'Delivered'}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;