import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Container,
  TextField,
  InputAdornment,
  Chip,
  Rating,
  Fab
} from '@mui/material';
import { Search, LocationOn, Star, AccessTime, ShoppingCart } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setFilters } from '../redux/slices/restaurantSlice';
import { addToCart } from '../redux/slices/cartSlice';
import UserLayout from '../components/layout/UserLayout';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { restaurants, cuisines } = useSelector((state: any) => state.restaurants);
  const { items } = useSelector((state: any) => state.cart);
  
  const [searchValue, setSearchValue] = React.useState('');
  
  // Get featured restaurants (top rated)
  const featuredRestaurants = restaurants
    .filter(r => r.rating >= 4.0)
    .slice(0, 6);

  const handleSearch = () => {
    dispatch(setSearchQuery(searchValue));
    navigate('/restaurants');
  };

  const handleCuisineClick = (cuisine) => {
    dispatch(setFilters({ cuisine }));
    navigate('/restaurants');
  };

  const totalCartItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <UserLayout>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, hsl(14, 100%, 53%), hsl(14, 100%, 45%))',
          borderRadius: 4,
          color: 'white',
          p: { xs: 4, md: 8 },
          mb: 6,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=600&fit=crop&overlay=black&overlay-opacity=0.3")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.3
          }}
        />
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Delicious Food, Delivered Fast
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Order from your favorite restaurants and get it delivered to your doorstep
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'grey.500' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <Button 
                    variant="contained" 
                    onClick={handleSearch}
                    sx={{ 
                      bgcolor: 'white', 
                      color: '#fff',
                      ml: 1,
                      '&:hover': {
                        bgcolor: 'grey.100'
                      }
                    }}
                  >
                    Search
                  </Button>
                )
              }}
              sx={{
                bgcolor: 'white',
                border: 'none',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Browse by Cuisine */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Browse by Cuisine
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(6, 1fr)' },
          gap: 2 
        }}>
          {cuisines.map((cuisine) => (
            <Box key={cuisine.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => handleCuisineClick(cuisine.name)}
              >
                <CardContent sx={{ py: 3 }}>
                  <Typography variant="h2" sx={{ mb: 1 }}>
                    {cuisine.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {cuisine.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cuisine.count} restaurants
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Featured Restaurants */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
            Featured Restaurants
          </Typography>
          <Button 
            component={Link} 
            to="/restaurants" 
            variant="outlined"
            sx={{ display: { xs: 'none', sm: 'inline-flex' } }}
          >
            View All
          </Button>
        </Box>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 3 
        }}>
          {featuredRestaurants.map((restaurant) => (
            <Box key={restaurant.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {restaurant.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {restaurant.rating} ({restaurant.reviews} reviews)
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Chip 
                      icon={<AccessTime />} 
                      label={restaurant.deliveryTime} 
                      size="small" 
                      variant="outlined"
                    />
                    <Chip 
                      label={restaurant.cuisine} 
                      size="small" 
                      color="primary"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                    {restaurant.address}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    component={Link}
                    to={`/restaurant/${restaurant.id}`}
                  >
                    View Menu
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Quick Stats */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          borderRadius: 4,
          p: 4,
          textAlign: 'center'
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Why Choose Foodie?
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 4,
          textAlign: 'center'
        }}>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              1000+
            </Typography>
            <Typography variant="h6">
              Restaurant Partners
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              30min
            </Typography>
            <Typography variant="h6">
              Average Delivery Time
            </Typography>
          </Box>
          <Box>
            <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
              4.8★
            </Typography>
            <Typography variant="h6">
              Customer Rating
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Floating Cart Button */}
      {totalCartItems > 0 && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000
          }}
          onClick={() => navigate('/cart')}
        >
          <Box sx={{ position: 'relative' }}>
            <ShoppingCart />
            <Box
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: 'secondary.main',
                color: 'white',
                borderRadius: '50%',
                minWidth: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 'bold'
              }}
            >
              {totalCartItems}
            </Box>
          </Box>
        </Fab>
      )}
    </UserLayout>
  );
};

export default Home;