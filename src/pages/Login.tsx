import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Link,
  Container,
  Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { users } from '../data/users';
import UserLayout from '../components/layout/UserLayout';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Mock authentication
    setTimeout(() => {
      const user = users.find(u => u.email === formData.email);
      
      if (user && formData.password === 'password123') { // Mock password
        dispatch(loginSuccess(user));
        navigate('/');
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    }, 1000);
  };

  const handleGuestContinue = () => {
    const guestUser = {
      id: 999,
      name: 'Guest User',
      email: 'guest@example.com',
      role: 'guest'
    };
    dispatch(loginSuccess(guestUser));
    navigate('/');
  };

  return (
    <UserLayout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" gutterBottom sx={{ mb: 3 }}>
                Sign in to your account to continue ordering
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Box>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link component={RouterLink} to="/signup" variant="body2">
                  Don't have an account? Sign up
                </Link>
              </Box>

              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Button
                variant="outlined"
                fullWidth
                onClick={handleGuestContinue}
                sx={{ mb: 2 }}
              >
                Continue as Guest
              </Button>

              {/* Demo Credentials */}
              <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>Demo Credentials:</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: user@example.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Password: password123
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Admin: admin@foodie.com / password123
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </UserLayout>
  );
};

export default Login;