export const restaurants = [
  {
    id: 1,
    name: "Italiano Bistro",
    cuisine: "Italian",
    rating: 4.5,
    reviews: 248,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    minOrder: 15,
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
    address: "123 Main St, Downtown",
    phone: "+1-555-0123",
    description: "Authentic Italian cuisine with fresh ingredients and traditional recipes.",
    status: "open",
    priceRange: "$$",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    menu: [
      {
        id: 101,
        name: "Margherita Pizza",
        price: 14.99,
        description: "Fresh tomato, mozzarella, basil",
        category: "Pizza",
        image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=300&h=200&fit=crop",
        available: true
      },
      {
        id: 102,
        name: "Spaghetti Carbonara",
        price: 16.99,
        description: "Creamy pasta with bacon and parmesan",
        category: "Pasta",
        image: "https://plus.unsplash.com/premium_photo-1674511582428-58ce834ce172?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?w=300&h=200&fit=crop",
        available: true
      }
    ]
  },
  {
    id: 2,
    name: "Dragon Palace",
    cuisine: "Chinese",
    rating: 4.2,
    reviews: 189,
    deliveryTime: "30-40 min",
    deliveryFee: 3.99,
    minOrder: 20,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=600&h=400&fit=crop",
    address: "456 Oak Ave, Chinatown",
    phone: "+1-555-0456",
    description: "Traditional Chinese dishes with authentic flavors.",
    status: "open",
    priceRange: "$",
    coordinates: { lat: 40.7180, lng: -74.0020 },
    menu: [
      {
        id: 201,
        name: "Sweet & Sour Chicken",
        price: 12.99,
        description: "Crispy chicken with pineapple and bell peppers",
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=300&h=200&fit=crop",
        available: true
      }
    ]
  },
  {
    id: 3,
    name: "Burger Junction",
    cuisine: "American",
    rating: 4.0,
    reviews: 156,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    minOrder: 10,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop",
    address: "789 Burger St, Food District",
    phone: "+1-555-0789",
    description: "Juicy burgers made with premium beef and fresh toppings.",
    status: "open",
    priceRange: "$",
    coordinates: { lat: 40.7200, lng: -74.0100 },
    menu: [
      {
        id: 301,
        name: "Classic Cheeseburger",
        price: 9.99,
        description: "Beef patty with cheese, lettuce, tomato, onion",
        category: "Burgers",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop",
        available: true
      }
    ]
  }
];

export const cuisines = [
  { id: 1, name: "Italian", icon: "🍝", count: 45 },
  { id: 2, name: "Chinese", icon: "🥡", count: 38 },
  { id: 3, name: "American", icon: "🍔", count: 52 },
  { id: 4, name: "Indian", icon: "🍛", count: 41 },
  { id: 5, name: "Mexican", icon: "🌮", count: 29 },
  { id: 6, name: "Japanese", icon: "🍱", count: 33 }
];