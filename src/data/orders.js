export const orders = [
  {
    id: 1001,
    userId: 1,
    userName: "John Doe",
    userPhone: "+1-555-1234",
    userAddress: "123 Main St, City, State 12345",
    restaurantId: 1,
    restaurantName: "Italiano Bistro",
    date: "2024-01-20T18:30:00Z",
    status: "delivered", // pending, confirmed, preparing, out_for_delivery, delivered, cancelled
    total: 31.97,
    subtotal: 24.98,
    deliveryFee: 2.99,
    tax: 2.00,
    tip: 2.00,
    paymentMethod: "credit_card",
    estimatedDelivery: "2024-01-20T19:15:00Z",
    actualDelivery: "2024-01-20T19:10:00Z",
    items: [
      {
        id: 101,
        name: "Margherita Pizza",
        quantity: 1,
        price: 14.99,
        notes: "Extra cheese"
      },
      {
        id: 102,
        name: "Spaghetti Carbonara", 
        quantity: 1,
        price: 16.99,
        notes: ""
      }
    ],
    timeline: [
      { status: "pending", time: "2024-01-20T18:30:00Z" },
      { status: "confirmed", time: "2024-01-20T18:35:00Z" },
      { status: "preparing", time: "2024-01-20T18:40:00Z" },
      { status: "out_for_delivery", time: "2024-01-20T19:00:00Z" },
      { status: "delivered", time: "2024-01-20T19:10:00Z" }
    ]
  },
  {
    id: 1002,
    userId: 1,
    userName: "John Doe",
    userPhone: "+1-555-1234", 
    userAddress: "123 Main St, City, State 12345",
    restaurantId: 2,
    restaurantName: "Dragon Palace",
    date: "2024-01-21T12:15:00Z",
    status: "preparing",
    total: 18.98,
    subtotal: 12.99,
    deliveryFee: 3.99,
    tax: 1.50,
    tip: 0.50,
    paymentMethod: "debit_card",
    estimatedDelivery: "2024-01-21T13:00:00Z",
    items: [
      {
        id: 201,
        name: "Sweet & Sour Chicken",
        quantity: 1,
        price: 12.99,
        notes: "Mild spice"
      }
    ],
    timeline: [
      { status: "pending", time: "2024-01-21T12:15:00Z" },
      { status: "confirmed", time: "2024-01-21T12:18:00Z" },
      { status: "preparing", time: "2024-01-21T12:25:00Z" }
    ]
  }
];

export const orderStatuses = [
  { value: "pending", label: "Pending", color: "#f59e0b" },
  { value: "confirmed", label: "Confirmed", color: "#3b82f6" },
  { value: "preparing", label: "Preparing", color: "#8b5cf6" },
  { value: "out_for_delivery", label: "Out for Delivery", color: "#06b6d4" },
  { value: "delivered", label: "Delivered", color: "#10b981" },
  { value: "cancelled", label: "Cancelled", color: "#ef4444" }
];