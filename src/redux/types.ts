export interface RootState {
  auth: {
    user: any;
    isAuthenticated: boolean;
    isAdmin: boolean;
    loading: boolean;
    error: string | null;
  };
  restaurants: {
    restaurants: any[];
    cuisines: any[];
    selectedRestaurant: any;
    filters: any;
    searchQuery: string;
    loading: boolean;
    error: string | null;
  };
  cart: {
    items: any[];
    restaurantId: number | null;
    subtotal: number;
    deliveryFee: number;
    tax: number;
    total: number;
    isOpen: boolean;
  };
  orders: {
    orders: any[];
    currentOrder: any;
    loading: boolean;
    error: string | null;
  };
  users: {
    users: any[];
    favorites: number[];
    loading: boolean;
    error: string | null;
  };
  admin: {
    analytics: any;
    loading: boolean;
    error: string | null;
  };
}