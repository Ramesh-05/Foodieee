export const users = [
  {
    id: 1,
    email: "user@example.com",
    name: "User One",
    phone: "+1-555-1234",
    address: "123 Main St, City, State 12345",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    favorites: [1, 3],
    orderHistory: [
      {
        id: 1001,
        date: "2024-01-20",
        restaurant: "Italiano Bistro",
        total: 24.98,
        status: "delivered",
        items: [
          { name: "Margherita Pizza", quantity: 1, price: 14.99 },
          { name: "Spaghetti Carbonara", quantity: 1, price: 16.99 }
        ]
      }
    ],
    preferences: {
      dietary: ["vegetarian"],
      notifications: true,
      marketing: false
    }
  },
  {
    id: 2,
    email: "admin@foodie.com",
    name: "Admin User",
    phone: "+1-555-0000",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    lastLogin: "2024-01-21T10:30:00Z"
  }
];

export const reviews = [
  {
    id: 1,
    userId: 1,
    userName: "User One",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    restaurantId: 1,
    rating: 5,
    comment: "Amazing pizza! Fresh ingredients and perfect crust.",
    date: "2024-01-15",
    helpful: 8
  },
  {
    id: 2,
    userId: 1,
    userName: "User One", 
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    restaurantId: 2,
    rating: 4,
    comment: "Good food, but delivery took longer than expected.",
    date: "2024-01-10",
    helpful: 3
  }
];