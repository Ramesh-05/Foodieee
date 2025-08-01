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
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { addUser } from '../redux/slices/userSlice';
import UserLayout from '../components/layout/UserLayout';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [formErrors, setFormErrors] = React.useState<any>({});

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors: any = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) errors.agreeToTerms = 'You must agree to the terms';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    dispatch(loginStart());

    // Mock user registration
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`,
        favorites: [],
        orderHistory: [],
        preferences: {
          dietary: [],
          notifications: true,
          marketing: false
        }
      };

      dispatch(addUser(newUser));
      dispatch(loginSuccess(newUser));
      navigate('/');
    }, 1000);
  };

  return (
    <UserLayout>
      <Container maxWidth="sm">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ boxShadow: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Join Foodie
              </Typography>
              <Typography variant="body1" color="text.secondary" align="center" gutterBottom sx={{ mb: 3 }}>
                Create your account to start ordering delicious food
              </Typography>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    required
                    fullWidth
                  />
                  
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />

                  <TextField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    fullWidth
                  />
                  
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={!!formErrors.password}
                    helperText={formErrors.password}
                    required
                    fullWidth
                  />

                  <TextField
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={!!formErrors.confirmPassword}
                    helperText={formErrors.confirmPassword}
                    required
                    fullWidth
                  />

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to the{' '}
                        <Link href="#" underline="hover">
                          Terms of Service
                        </Link>
                        {' '}and{' '}
                        <Link href="#" underline="hover">
                          Privacy Policy
                        </Link>
                      </Typography>
                    }
                  />
                  {formErrors.agreeToTerms && (
                    <Typography variant="body2" color="error">
                      {formErrors.agreeToTerms}
                    </Typography>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 2 }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </Box>
              </form>

              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </UserLayout>
  );
};

export default Signup;