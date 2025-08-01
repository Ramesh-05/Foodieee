import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Rating,
  Paper,
  Divider,
  Slider
} from '@mui/material';
import { Search, FilterList, LocationOn, AccessTime, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery, setFilters, clearFilters } from '../redux/slices/restaurantSlice';
import UserLayout from '../components/layout/UserLayout';

const RestaurantList = () => {
  const dispatch = useDispatch();
  const { restaurants, cuisines, filters, searchQuery } = useSelector((state: any) => state.restaurants);
  
  const [localSearchQuery, setLocalSearchQuery] = React.useState(searchQuery);
  const [showFilters, setShowFilters] = React.useState(false);

  // Filter restaurants based on current filters and search
  const filteredRestaurants = React.useMemo(() => {
    return restaurants.filter((restaurant: any) => {
      const matchesSearch = !searchQuery || 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCuisine = !filters.cuisine || restaurant.cuisine === filters.cuisine;
      const matchesRating = !filters.rating || restaurant.rating >= filters.rating;
      const matchesPriceRange = !filters.priceRange || restaurant.priceRange === filters.priceRange;
      
      return matchesSearch && matchesCuisine && matchesRating && matchesPriceRange;
    }).sort((a: any, b: any) => {
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'deliveryTime':
          return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
        case 'price':
          return a.minOrder - b.minOrder;
        default:
          return b.rating - a.rating;
      }
    });
  }, [restaurants, filters, searchQuery]);

  const handleSearch = (e: any) => {
    e.preventDefault();
    dispatch(setSearchQuery(localSearchQuery));
  };

  const handleFilterChange = (filterType: string, value: any) => {
    dispatch(setFilters({ [filterType]: value }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setLocalSearchQuery('');
  };

  return (
    <UserLayout>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Restaurants ({filteredRestaurants.length})
        </Typography>
        
        {/* Search Bar */}
        <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            placeholder="Search restaurants, cuisines, or dishes..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <Button 
                  type="submit" 
                  variant="contained" 
                  sx={{ ml: 1 }}
                >
                  Search
                </Button>
              )
            }}
          />
        </Box>

        {/* Filter Toggle */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button
            startIcon={<FilterList />}
            onClick={() => setShowFilters(!showFilters)}
            variant={showFilters ? 'contained' : 'outlined'}
          >
            Filters
          </Button>
          
          {(filters.cuisine || filters.rating || filters.priceRange || searchQuery) && (
            <Button onClick={handleClearFilters} color="error">
              Clear All Filters
            </Button>
          )}
        </Box>

        {/* Active Filters */}
        {(filters.cuisine || filters.rating || filters.priceRange || searchQuery) && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {searchQuery && (
              <Chip
                label={`Search: "${searchQuery}"`}
                onDelete={() => dispatch(setSearchQuery(''))}
                color="primary"
              />
            )}
            {filters.cuisine && (
              <Chip
                label={`Cuisine: ${filters.cuisine}`}
                onDelete={() => handleFilterChange('cuisine', '')}
                color="primary"
              />
            )}
            {filters.rating > 0 && (
              <Chip
                label={`Rating: ${filters.rating}+ stars`}
                onDelete={() => handleFilterChange('rating', 0)}
                color="primary"
              />
            )}
            {filters.priceRange && (
              <Chip
                label={`Price: ${filters.priceRange}`}
                onDelete={() => handleFilterChange('priceRange', '')}
                color="primary"
              />
            )}
          </Box>
        )}

        {/* Filter Panel */}
        {showFilters && (
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Cuisine</InputLabel>
                  <Select
                    value={filters.cuisine}
                    label="Cuisine"
                    onChange={(e) => handleFilterChange('cuisine', e.target.value)}
                  >
                    <MenuItem value="">All Cuisines</MenuItem>
                    {cuisines.map((cuisine: any) => (
                      <MenuItem key={cuisine.id} value={cuisine.name}>
                        {cuisine.icon} {cuisine.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              
              <Box>
                <Typography gutterBottom>Minimum Rating</Typography>
                <Slider
                  value={filters.rating}
                  onChange={(e, value) => handleFilterChange('rating', value)}
                  min={0}
                  max={5}
                  step={0.5}
                  marks={[
                    { value: 0, label: 'Any' },
                    { value: 3, label: '3+' },
                    { value: 4, label: '4+' },
                    { value: 5, label: '5' }
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>
              
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Price Range</InputLabel>
                  <Select
                    value={filters.priceRange}
                    label="Price Range"
                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  >
                    <MenuItem value="">All Prices</MenuItem>
                    <MenuItem value="$">$ - Budget Friendly</MenuItem>
                    <MenuItem value="$$">$$ - Moderate</MenuItem>
                    <MenuItem value="$$$">$$$ - Expensive</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy}
                    label="Sort By"
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    <MenuItem value="rating">Rating</MenuItem>
                    <MenuItem value="deliveryTime">Delivery Time</MenuItem>
                    <MenuItem value="price">Price</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>

      {/* Restaurant Grid */}
      {filteredRestaurants.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>
            No restaurants found
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Try adjusting your filters or search terms
          </Typography>
          <Button variant="contained" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </Box>
      ) : (
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
          gap: 3 
        }}>
          {filteredRestaurants.map((restaurant: any) => (
            <Box key={restaurant.id}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={restaurant.image}
                  alt={restaurant.name}
                />
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                      {restaurant.name}
                    </Typography>
                    <Chip 
                      label={restaurant.status === 'open' ? 'Open' : 'Closed'} 
                      color={restaurant.status === 'open' ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={restaurant.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {restaurant.rating} ({restaurant.reviews})
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {restaurant.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
                    <Chip 
                      label={restaurant.priceRange} 
                      size="small" 
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary">
                    <LocationOn sx={{ fontSize: 16, mr: 0.5 }} />
                    {restaurant.address}
                  </Typography>
                  
                  <Divider sx={{ my: 1 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">
                      Delivery: ${restaurant.deliveryFee} • Min: ${restaurant.minOrder}
                    </Typography>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    component={Link}
                    to={`/restaurant/${restaurant.id}`}
                    disabled={restaurant.status !== 'open'}
                  >
                    {restaurant.status === 'open' ? 'View Menu' : 'Closed'}
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </UserLayout>
  );
};

export default RestaurantList;