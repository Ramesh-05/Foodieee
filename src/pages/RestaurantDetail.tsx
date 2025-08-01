import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Paper,
  Chip,
  Rating,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  LocationOn, 
  AccessTime, 
  Phone, 
  Add, 
  Remove,
  Favorite,
  FavoriteBorder,
  Share,
  Star
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { addToFavorites, removeFromFavorites } from '../redux/slices/userSlice';
import UserLayout from '../components/layout/UserLayout';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { restaurants } = useSelector((state: any) => state.restaurants);
  const { favorites } = useSelector((state: any) => state.users);
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [notes, setNotes] = React.useState('');

  const isFavorite = favorites.includes(restaurant?.id);

  if (!restaurant) {
    return (
      <UserLayout>
        <Typography variant="h4">Restaurant not found</Typography>
      </UserLayout>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      item: { ...selectedItem, notes },
      restaurantId: restaurant.id,
      deliveryFee: restaurant.deliveryFee
    }));
    setSelectedItem(null);
    setQuantity(1);
    setNotes('');
  };

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (isFavorite) {
      dispatch(removeFromFavorites(restaurant.id));
    } else {
      dispatch(addToFavorites(restaurant.id));
    }
  };

  const groupedMenu = restaurant.menu?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {}) || {};

  return (
    <UserLayout>
      {/* Restaurant Header */}
      <Box sx={{ mb: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={restaurant.image}
            alt={restaurant.name}
          />
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {restaurant.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {restaurant.description}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={handleFavoriteToggle} color="error">
                  {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <IconButton color="primary">
                  <Share />
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={restaurant.rating} precision={0.1} readOnly />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {restaurant.rating} ({restaurant.reviews} reviews)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
              <Box sx={{ flex: { md: '0 0 33%' } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    Delivery: {restaurant.deliveryTime}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {restaurant.address}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {restaurant.phone}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip label={restaurant.cuisine} color="primary" />
                  <Chip label={restaurant.priceRange} variant="outlined" />
                  <Chip 
                    label={restaurant.status === 'open' ? 'Open Now' : 'Closed'} 
                    color={restaurant.status === 'open' ? 'success' : 'error'}
                  />
                  <Chip label={`Min Order: $${restaurant.minOrder}`} variant="outlined" />
                  <Chip label={`Delivery: $${restaurant.deliveryFee}`} variant="outlined" />
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Menu */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
        Menu
      </Typography>

      {Object.entries(groupedMenu).map(([category, items]) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {category}
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
            {(items as any[]).map((item) => (
              <Card key={item.id} sx={{ 
                display: 'flex',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2
                }
              }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={item.image}
                  alt={item.name}
                />
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography variant="h6" component="h4" gutterBottom>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {item.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                      ${item.price}
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => {
                        setSelectedItem(item);
                        setQuantity(1);
                        setNotes('');
                      }}
                      disabled={!item.available}
                    >
                      {item.available ? 'Add' : 'Unavailable'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      ))}

      {/* Add to Cart Dialog */}
      <Dialog open={!!selectedItem} onClose={() => setSelectedItem(null)} maxWidth="sm" fullWidth>
        {selectedItem && (
          <>
            <DialogTitle>
              Add {selectedItem.name} to Cart
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.name}
                  style={{ width: 80, height: 80, borderRadius: 8, objectFit: 'cover' }}
                />
                <Box>
                  <Typography variant="h6">{selectedItem.name}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {selectedItem.description}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    ${selectedItem.price}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="body1">Quantity:</Typography>
                <IconButton onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Remove />
                </IconButton>
                <Typography variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                  {quantity}
                </Typography>
                <IconButton onClick={() => setQuantity(quantity + 1)}>
                  <Add />
                </IconButton>
              </Box>

              <TextField
                fullWidth
                label="Special Instructions (Optional)"
                multiline
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g., Extra spicy, no onions..."
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedItem(null)}>
                Cancel
              </Button>
              <Button variant="contained" onClick={handleAddToCart}>
                Add to Cart - ${(selectedItem.price * quantity).toFixed(2)}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </UserLayout>
  );
};

export default RestaurantDetail;