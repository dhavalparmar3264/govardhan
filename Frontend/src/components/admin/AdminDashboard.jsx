import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Calendar,
  DollarSign,
  Users,
  Bell,
  Settings,
  Eye,
  Edit,
  Loader2,
  Clock,
} from "lucide-react";
import { api } from "../../services/api";

// ✅ Format as USD directly, no conversion
const formatUSD = (value) => `$${Number(value).toFixed(2)}`;

const AdminDashboard = () => {
  // State for data fetching
  const [recentOrders, setRecentOrders] = useState([]);
  const [todaysReservations, setTodaysReservations] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [reservationsLoading, setReservationsLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);
  const [reservationsError, setReservationsError] = useState(null);

  // Refresh functions
  const refreshOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError(null);

      const adminToken = localStorage.getItem("govardhanthal_admin_authenticated");
      const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};

      const response = await api.get("/orders", { headers });
      if (response.data.success) {
        const orders = response.data.data.slice(0, 5);
        setRecentOrders(orders);
      } else {
        setOrdersError("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersError("Failed to fetch orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  const refreshReservations = async () => {
    try {
      setReservationsLoading(true);
      setReservationsError(null);

      const adminToken = localStorage.getItem("govardhanthal_admin_authenticated");
      const headers = adminToken ? { Authorization: `Bearer ${adminToken}` } : {};

      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split("T")[0];

      const response = await api.get(`/reservations/today?date=${today}&limit=5`, { headers });

      if (response.data.success) {
        const reservations = response.data.data.reservations || [];
        setTodaysReservations(reservations);
      } else {
        setReservationsError("Failed to fetch reservations");
      }
    } catch (error) {
      console.error("❌ Error fetching reservations:", error);
      setReservationsError(`Failed to fetch reservations: ${error.message}`);
    } finally {
      setReservationsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    refreshOrders();
    refreshReservations();
  }, []);

  // Calculate dynamic stats from actual data
  const totalReservationsToday = todaysReservations.length;
  const confirmedReservationsToday = todaysReservations.filter(
    (r) => r.status?.toLowerCase() === "confirmed"
  ).length;
  const totalGuestsToday = todaysReservations.reduce(
    (sum, r) => sum + (r.partySize || 0),
    0
  );

  const stats = [
    {
      name: "Total Revenue",
      value: 45231,
      change: "+20.1%",
      changeType: "positive",
      icon: DollarSign,
      color: "bg-gradient-to-r from-green-400 to-green-600",
    },
    {
      name: "Orders Today",
      value: recentOrders.length,
      change: "+12%",
      changeType: "positive",
      icon: ShoppingCart,
      color: "bg-gradient-to-r from-blue-400 to-blue-600",
    },
    {
      name: "Reservations Today",
      value: totalReservationsToday,
      change: confirmedReservationsToday > 0 ? `${confirmedReservationsToday} confirmed` : "0 confirmed",
      changeType: "positive",
      icon: Calendar,
      color: "bg-gradient-to-r from-pink-400 to-pink-600",
    },
    {
      name: "Guests Today",
      value: totalGuestsToday,
      change: totalReservationsToday > 0 ? `${totalReservationsToday} bookings` : "No bookings",
      changeType: "positive",
      icon: Users,
      color: "bg-gradient-to-r from-purple-400 to-purple-600",
    },
    {
      name: "Avg. Wait Time",
      value: "12 min",
      change: "-5%",
      changeType: "negative",
      icon: Clock,
      color: "bg-gradient-to-r from-orange-400 to-orange-600",
    },
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "preparing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getReservationStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTime = (timeString) => {
    try {
      if (timeString.includes(":")) {
        const [hours, minutes] = timeString.split(":");
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
      }
      return timeString;
    } catch {
      return timeString;
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border hover:shadow-md transition-shadow">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Stats Section - Fixed responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.name}
                className="relative bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100 p-4 lg:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs lg:text-sm font-medium text-gray-500 mb-1 truncate">
                      {stat.name}
                    </p>
                    <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      {typeof stat.value === "number" && stat.name.includes("Revenue")
                        ? formatUSD(stat.value)
                        : stat.value}
                    </p>
                    <div className="flex flex-col xl:flex-row xl:items-center gap-1">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                          stat.changeType === "positive"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500 xl:ml-2">
                        {stat.name.includes("Today") ? "today" : "vs last month"}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-2 lg:p-3 rounded-lg lg:rounded-xl shadow-lg flex-shrink-0 ml-2`}>
                    <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders and Today's Reservations */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Recent Orders */}
          <div className="xl:col-span-2 bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100">
            <div className="p-4 lg:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between gap-4">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Orders</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={refreshOrders}
                  disabled={ordersLoading}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {ordersLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                  Refresh
                </button>
                <button className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="p-4 lg:p-6">
              <div className="space-y-4">
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
                    <span className="ml-2 text-gray-600">Loading orders...</span>
                  </div>
                ) : ordersError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-2">Error loading orders</p>
                    <p className="text-sm text-gray-500">{ordersError}</p>
                  </div>
                ) : recentOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No orders available</p>
                    <p className="text-sm text-gray-500">Recent orders will appear here</p>
                  </div>
                ) : (
                  recentOrders.map((order) => (
                    <div
                      key={order._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {order.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 truncate">{order.name}</p>
                          <p className="text-sm text-gray-500">
                            Order #{order._id.slice(-6)} • {order.items?.length || 0} items •{" "}
                            {new Date(order.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                        <span className="font-semibold text-gray-900">
                          {formatUSD(order.total)}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              order.status || "Pending"
                            )}`}
                          >
                            {order.status || "Pending"}
                          </span>
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Today's Reservations */}
          <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm border border-gray-100">
            <div className="p-4 lg:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between gap-4">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                Today's Reservations ({totalReservationsToday})
              </h2>
              <button
                onClick={refreshReservations}
                disabled={reservationsLoading}
                className="text-sm text-orange-600 hover:text-orange-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {reservationsLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                Refresh
              </button>
            </div>
            <div className="p-4 lg:p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reservationsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
                    <span className="ml-2 text-gray-600">Loading reservations...</span>
                  </div>
                ) : reservationsError ? (
                  <div className="text-center py-8">
                    <p className="text-red-600 mb-2">Error loading reservations</p>
                    <p className="text-sm text-gray-500">{reservationsError}</p>
                    <button
                      onClick={refreshReservations}
                      className="mt-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Try Again
                    </button>
                  </div>
                ) : todaysReservations.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 font-medium">No reservations for today</p>
                    <p className="text-sm text-gray-500">Today's reservations will appear here</p>
                  </div>
                ) : (
                  todaysReservations.map((reservation) => (
                    <div
                      key={reservation._id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-orange-200 hover:bg-orange-50 transition-all"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900 text-sm truncate pr-2">{reservation.name}</p>
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${getReservationStatusColor(
                            reservation.status || "pending"
                          )}`}
                        >
                          {reservation.status || "pending"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">
                        Res #{reservation._id.slice(-6)} • {formatTime(reservation.time)} •{" "}
                        {reservation.partySize} people
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-gray-400 truncate pr-2">{reservation.phone}</p>
                        <p className="text-xs text-gray-400 flex-shrink-0">{formatDate(reservation.date)}</p>
                      </div>
                      {reservation.notes && (
                        <p className="text-xs text-gray-500 italic">
                          "{reservation.notes.substring(0, 50)}
                          {reservation.notes.length > 50 ? "..." : ""}"
                        </p>
                      )}
                    </div>
                  ))
                )}
                {todaysReservations.length > 0 && (
                  <button className="w-full mt-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium border border-orange-200 rounded-lg hover:bg-orange-50 transition-colors">
                    View All Reservations
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;