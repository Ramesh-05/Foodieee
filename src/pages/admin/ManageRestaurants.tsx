import React from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Edit, Delete, Add, Visibility } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addRestaurant, updateRestaurant, deleteRestaurant } from '../../redux/slices/restaurantSlice';
import AdminLayout from '../../components/layout/AdminLayout';

const ManageRestaurants = () => {
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state: any) => state.restaurants);
  
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [editingRestaurant, setEditingRestaurant] = React.useState<any>(null);
  const [formData, setFormData] = React.useState({
    name: '',
    cuisine: '',
    address: '',
    phone: '',
    description: '',
    image: '',
    deliveryTime: '',
    deliveryFee: '',
    minOrder: '',
    priceRange: '$',
    status: 'open'
  });

  const handleEdit = (restaurant: any) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      cuisine: restaurant.cuisine,
      address: restaurant.address,
      phone: restaurant.phone,
      description: restaurant.description,
      image: restaurant.image,
      deliveryTime: restaurant.deliveryTime,
      deliveryFee: restaurant.deliveryFee.toString(),
      minOrder: restaurant.minOrder.toString(),
      priceRange: restaurant.priceRange,
      status: restaurant.status
    });
    setDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingRestaurant(null);
    setFormData({
      name: '',
      cuisine: '',
      address: '',
      phone: '',
      description: '',
      image: '',
      deliveryTime: '',
      deliveryFee: '',
      minOrder: '',
      priceRange: '$',
      status: 'open'
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    const restaurantData = {
      ...formData,
      deliveryFee: parseFloat(formData.deliveryFee),
      minOrder: parseFloat(formData.minOrder),
      rating: editingRestaurant?.rating || 4.0,
      reviews: editingRestaurant?.reviews || 0,
      coordinates: editingRestaurant?.coordinates || { lat: 40.7128, lng: -74.0060 },
      menu: editingRestaurant?.menu || []
    };

    if (editingRestaurant) {
      dispatch(updateRestaurant({ ...restaurantData, id: editingRestaurant.id }));
    } else {
      dispatch(addRestaurant({ ...restaurantData, id: Date.now() }));
    }
    
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      dispatch(deleteRestaurant(id));
    }
  };

  return (
    <AdminLayout>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Manage Restaurants
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAdd}
        >
          Add Restaurant
        </Button>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
        {restaurants.map((restaurant: any) => (
          <Box key={restaurant.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={restaurant.image}
                alt={restaurant.name}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Typography variant="h6" component="h3">
                    {restaurant.name}
                  </Typography>
                  <Chip 
                    label={restaurant.status} 
                    color={restaurant.status === 'open' ? 'success' : 'error'}
                    size="small"
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {restaurant.cuisine} • {restaurant.priceRange}
                </Typography>
                
                <Typography variant="body2" gutterBottom>
                  {restaurant.address}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Delivery: {restaurant.deliveryTime} • Min: ${restaurant.minOrder}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <IconButton color="primary" onClick={() => handleEdit(restaurant)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="info">
                    <Visibility />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(restaurant.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Restaurant Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Cuisine"
                value={formData.cuisine}
                onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              fullWidth
              required
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                fullWidth
                required
              />
              <TextField
                label="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                fullWidth
                required
              />
            </Box>
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              multiline
              rows={3}
            />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Delivery Time"
                value={formData.deliveryTime}
                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                fullWidth
                placeholder="e.g., 25-35 min"
              />
              <TextField
                label="Delivery Fee"
                type="number"
                value={formData.deliveryFee}
                onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value })}
                fullWidth
                inputProps={{ step: 0.01 }}
              />
              <TextField
                label="Minimum Order"
                type="number"
                value={formData.minOrder}
                onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                fullWidth
                inputProps={{ step: 0.01 }}
              />
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Price Range</InputLabel>
                <Select
                  value={formData.priceRange}
                  label="Price Range"
                  onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                >
                  <MenuItem value="$">$ - Budget</MenuItem>
                  <MenuItem value="$$">$$ - Moderate</MenuItem>
                  <MenuItem value="$$$">$$$ - Expensive</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  <MenuItem value="open">Open</MenuItem>
                  <MenuItem value="closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            {editingRestaurant ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </AdminLayout>
  );
};

export default ManageRestaurants;