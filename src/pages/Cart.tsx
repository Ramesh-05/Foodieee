import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Grid,
  Paper,
  TextField,
  Alert
} from '@mui/material';
import { Add, Remove, Delete, ShoppingCartOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import { createOrderSuccess } from '../redux/slices/orderSlice';
import UserLayout from '../components/layout/UserLayout';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { items, restaurantId, subtotal, deliveryFee, tax, total } = useSelector((state: any) => state.cart);
  const { restaurants } = useSelector((state: any) => state.restaurants);
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  
  const restaurant = restaurants.find(r => r.id === restaurantId);
  const [promoCode, setPromoCode] = React.useState('');

  const handleQuantityChange = (itemId, newQuantity) => {
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Create mock order
    const order = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      userPhone: user.phone,
      userAddress: user.address,
      restaurantId,
      restaurantName: restaurant.name,
      date: new Date().toISOString(),
      status: 'pending',
      total,
      subtotal,
      deliveryFee,
      tax,
      tip: 0,
      paymentMethod: 'credit_card',
      estimatedDelivery: new Date(Date.now() + 45 * 60000).toISOString(), // 45 minutes
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        notes: item.notes || ''
      })),
      timeline: [
        { status: 'pending', time: new Date().toISOString() }
      ]
    };

    dispatch(createOrderSuccess(order));
    dispatch(clearCart());
    navigate('/profile');
  };

  if (items.length === 0) {
    return (
      <UserLayout>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <ShoppingCartOutlined sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Add some delicious items to get started
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/restaurants"
            sx={{ mt: 2 }}
          >
            Browse Restaurants
          </Button>
        </Box>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Cart
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
        <Box sx={{ flex: 2 }}>
          {/* Restaurant Info */}
          {restaurant && (
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ordering from {restaurant.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.address} • Delivery: {restaurant.deliveryTime}
                </Typography>
              </CardContent>
            </Card>
          )}

          {/* Cart Items */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Items ({items.length})
              </Typography>
              
              {items.map((item, index) => (
                <Box key={item.id}>
                  <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
                    <Box sx={{ mr: 2 }}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: 8, 
                          objectFit: 'cover' 
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        {item.name}
                      </Typography>
                      {item.notes && (
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          Note: {item.notes}
                        </Typography>
                      )}
                      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold' }}>
                        ${item.price} each
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
                      <IconButton 
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Remove />
                      </IconButton>
                      <Typography variant="body1" sx={{ minWidth: 32, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <IconButton 
                        size="small"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <Box sx={{ minWidth: 80, textAlign: 'right', mr: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                    </Box>

                    <IconButton 
                      color="error"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  
                  {index < items.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Promo Code */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Promo Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  sx={{ flexGrow: 1 }}
                />
                <Button variant="outlined">
                  Apply
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ flex: 1 }}>
          {/* Order Summary */}
          <Paper sx={{ p: 3, position: 'sticky', top: 24 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Subtotal</Typography>
              <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">Delivery Fee</Typography>
              <Typography variant="body2">${deliveryFee.toFixed(2)}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body2">Tax</Typography>
              <Typography variant="body2">${tax.toFixed(2)}</Typography>
            </Box>
            
            <Divider sx={{ mb: 2 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                ${total.toFixed(2)}
              </Typography>
            </Box>

            {restaurant && restaurant.minOrder > subtotal && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                Minimum order amount is ${restaurant.minOrder}. 
                Add ${(restaurant.minOrder - subtotal).toFixed(2)} more to proceed.
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleCheckout}
              disabled={restaurant && restaurant.minOrder > subtotal}
              sx={{ mb: 2 }}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              component={Link}
              to={restaurant ? `/restaurant/${restaurant.id}` : '/restaurants'}
            >
              Add More Items
            </Button>
          </Paper>
        </Box>
      </Box>
    </UserLayout>
  );
};

export default Cart;