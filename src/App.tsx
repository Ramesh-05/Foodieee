import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { store } from './redux/store';
import { muiTheme } from './theme/muiTheme';

// User Pages
import Home from "./pages/Home";
import RestaurantList from "./pages/RestaurantList";
import RestaurantDetail from "./pages/RestaurantDetail";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import ManageRestaurants from "./pages/admin/ManageRestaurants";
import ManageMenu from "./pages/admin/ManageMenu";
import ManageOrders from "./pages/admin/ManageOrders";
import ManageUsers from "./pages/admin/ManageUsers";
import ReviewModeration from "./pages/admin/ReviewModeration";
import Analytics from "./pages/admin/Analytics";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminLogin from "./pages/admin/Login";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<RestaurantList />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/restaurants" element={<ManageRestaurants />} />
              <Route path="/admin/menu/:restaurantId" element={<ManageMenu />} />
              <Route path="/admin/orders" element={<ManageOrders />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/reviews" element={<ReviewModeration />} />
              <Route path="/admin/analytics" element={<Analytics />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </Provider>
);

export default App;
