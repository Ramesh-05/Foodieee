import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Avatar,
  Chip,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { 
  Edit, 
  Favorite, 
  History, 
  Settings,
  Receipt,
  Star,
  LocationOn,
  Phone,
  Email
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, logout } from '../redux/slices/authSlice';
import UserLayout from '../components/layout/UserLayout';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const { orders } = useSelector((state: any) => state.orders);
  const { restaurants } = useSelector((state: any) => state.restaurants);
  const { favorites } = useSelector((state: any) => state.users);
  
  const [currentTab, setCurrentTab] = React.useState(0);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editForm, setEditForm] = React.useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const userOrders = orders.filter(order => order.userId === user?.id);
  const favoriteRestaurants = restaurants.filter(r => favorites.includes(r.id));

  if (!isAuthenticated) {
    return (
      <UserLayout>
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Please log in to view your profile
          </Typography>
          <Button variant="contained" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Box>
      </UserLayout>
    );
  }

  const handleSaveProfile = () => {
    dispatch(updateProfile(editForm));
    setEditDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'warning',
      confirmed: 'info',
      preparing: 'primary',
      out_for_delivery: 'secondary',
      delivered: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const TabPanel = ({ children, value, index }) => (
    <Box hidden={value !== index} sx={{ pt: 3 }}>
      {value === index && children}
    </Box>
  );

  return (
    <UserLayout>
      {/* Profile Header */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar 
              src={user.avatar} 
              sx={{ width: 80, height: 80 }}
            >
              {user.name?.charAt(0)}
            </Avatar>
            
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">{user.email}</Typography>
                </Box>
                {user.phone && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{user.phone}</Typography>
                  </Box>
                )}
                {user.address && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2">{user.address}</Typography>
                  </Box>
                )}
              </Box>

              <Box sx={{ display: 'flex', gap: 1 }}>
                <Chip 
                  icon={<Receipt />} 
                  label={`${userOrders.length} Orders`} 
                  variant="outlined"
                />
                <Chip 
                  icon={<Favorite />} 
                  label={`${favoriteRestaurants.length} Favorites`} 
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={() => setEditDialogOpen(true)}
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
          <Tab icon={<History />} label="Order History" />
          <Tab icon={<Favorite />} label="Favorites" />
          <Tab icon={<Settings />} label="Settings" />
        </Tabs>
      </Box>

      {/* Order History Tab */}
      <TabPanel value={currentTab} index={0}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Order History
        </Typography>
        
        {userOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No orders yet. Start ordering from your favorite restaurants!
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Restaurant</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>#{order.id}</TableCell>
                    <TableCell>{order.restaurantName}</TableCell>
                    <TableCell>
                      {new Date(order.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.status.replace('_', ' ')} 
                        color={getStatusColor(order.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button size="small">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TabPanel>

      {/* Favorites Tab */}
      <TabPanel value={currentTab} index={1}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Favorite Restaurants
        </Typography>
        
        {favoriteRestaurants.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No favorites yet. Add some restaurants to your favorites!
            </Typography>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3 
          }}>
            {favoriteRestaurants.map((restaurant) => (
              <Box key={restaurant.id}>
                <Card>
                  <Box
                    component="img"
                    sx={{ height: 140, width: '100%', objectFit: 'cover' }}
                    src={restaurant.image}
                    alt={restaurant.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {restaurant.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Star sx={{ color: 'orange', mr: 0.5 }} />
                      <Typography variant="body2">
                        {restaurant.rating} ({restaurant.reviews})
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {restaurant.cuisine} • {restaurant.deliveryTime}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        )}
      </TabPanel>

      {/* Settings Tab */}
      <TabPanel value={currentTab} index={2}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
          Account Settings
        </Typography>
        
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3 
        }}>
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Notifications
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Order Updates</Typography>
                    <Button size="small">Enabled</Button>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2">Promotional Emails</Typography>
                    <Button size="small">Disabled</Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          
          <Box>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Privacy
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="outlined">Download My Data</Button>
                  <Button variant="outlined" color="error">Delete Account</Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </TabPanel>

      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Phone"
              value={editForm.phone}
              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              fullWidth
            />
            <TextField
              label="Address"
              value={editForm.address}
              onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProfile}>Save</Button>
        </DialogActions>
      </Dialog>
    </UserLayout>
  );
};

export default Profile;