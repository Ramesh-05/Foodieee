import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Badge,
  Container,
  Box,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { 
  ShoppingCart, 
  Person, 
  Favorite,
  Search,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { toggleCart } from '../../redux/slices/cartSlice';

const UserLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state: any) => state.auth);
  const { items } = useSelector((state: any) => state.cart);
  
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  const handleCartClick = () => {
    dispatch(toggleCart());
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                fontWeight: 'bold', 
                textDecoration: 'none', 
                color: 'inherit',
                mr: 3
              }}
            >
              🍔 Foodie
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/"
                sx={{ 
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                  textDecoration: location.pathname === '/' ? 'underline' : 'none'
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/restaurants"
                sx={{ 
                  fontWeight: location.pathname === '/restaurants' ? 'bold' : 'normal',
                  textDecoration: location.pathname === '/restaurants' ? 'underline' : 'none'
                }}
              >
                Restaurants
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton color="inherit" onClick={handleCartClick}>
              <Badge badgeContent={totalItems} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton color="inherit" onClick={handleProfileClick}>
                  <Avatar 
                    src={user?.avatar} 
                    sx={{ width: 32, height: 32 }}
                  >
                    {user?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                    <Person sx={{ mr: 1 }} /> Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate('/profile'); handleClose(); }}>
                    <Favorite sx={{ mr: 1 }} /> Favorites
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  variant="outlined"
                  sx={{ 
                    borderColor: 'white', 
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  Login
                </Button>
                <Button 
                  component={Link} 
                  to="/signup"
                  variant="contained"
                  sx={{ 
                    bgcolor: 'white', 
                    color: '#fff',
                    '&:hover': {
                      bgcolor: 'rgba(255,255,255,0.9)'
                    }
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        {children}
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          bgcolor: 'grey.100', 
          py: 4, 
          mt: 'auto' 
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Foodie. All rights reserved. | Made with ❤️ for food lovers
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default UserLayout;