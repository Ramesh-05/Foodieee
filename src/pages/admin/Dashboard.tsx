import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import {
  Restaurant,
  ShoppingCart,
  AttachMoney,
  People,
  Star,
  TrendingUp,
  Receipt,
  Person,
  RateReview
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';

const Dashboard = () => {
  const { analytics } = useSelector((state: any) => state.admin);
  const { orders } = useSelector((state: any) => state.orders);
  
  // Recent orders for dashboard
  const recentOrders = orders.slice(0, 5);

  const stats = [
    {
      title: 'Total Restaurants',
      value: analytics.totalRestaurants,
      icon: <Restaurant />,
      color: 'primary.main',
      change: '+5 this month'
    },
    {
      title: 'Total Orders',
      value: analytics.totalOrders.toLocaleString(),
      icon: <ShoppingCart />,
      color: 'success.main',
      change: '+12% vs last month'
    },
    {
      title: 'Total Revenue',
      value: `$${analytics.totalRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: 'warning.main',
      change: '+8% vs last month'
    },
    {
      title: 'Total Users',
      value: analytics.totalUsers.toLocaleString(),
      icon: <People />,
      color: 'info.main',
      change: '+15% vs last month'
    }
  ];

  const todayStats = [
    {
      title: "Today's Orders",
      value: analytics.ordersToday,
      icon: <Receipt />
    },
    {
      title: "Today's Revenue",
      value: `$${analytics.revenueToday}`,
      icon: <TrendingUp />
    },
    {
      title: 'New Users Today',
      value: analytics.newUsersToday,
      icon: <Person />
    },
    {
      title: 'Avg Rating',
      value: analytics.averageRating,
      icon: <Star />
    }
  ];

  return (
    <AdminLayout>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
        Dashboard Overview
      </Typography>

      {/* Main Stats */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
        {stats.map((stat, index) => (
          <Box key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box 
                    sx={{ 
                      bgcolor: stat.color, 
                      color: 'white', 
                      p: 1, 
                      borderRadius: 1, 
                      mr: 2 
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" color="success.main">
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 2fr' }, gap: 3 }}>
        {/* Today's Overview */}
        <Box>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Today's Overview
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {todayStats.map((stat, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box sx={{ color: 'primary.main', mr: 1 }}>
                        {stat.icon}
                      </Box>
                      <Typography variant="body2">
                        {stat.title}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Recent Orders */}
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell>Restaurant</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.userName}</TableCell>
                        <TableCell>{order.restaurantName}</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status.replace('_', ' ')} 
                            color={order.status === 'delivered' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 3 }}>
        {/* Popular Dishes */}
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Popular Dishes
              </Typography>
              <List>
                {analytics.popularDishes.map((dish, index) => (
                  <ListItem key={index} divider={index < analytics.popularDishes.length - 1}>
                    <ListItemText
                      primary={dish.name}
                      secondary={`${dish.orders} orders`}
                    />
                    <Typography variant="body2" color="primary">
                      #{index + 1}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Recent Activity */}
        <Box>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Recent Activity
              </Typography>
              <List>
                {analytics.recentActivity.map((activity, index) => (
                  <ListItem key={index} divider={index < analytics.recentActivity.length - 1}>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        {activity.type === 'order' && <ShoppingCart sx={{ fontSize: 16 }} />}
                        {activity.type === 'restaurant' && <Restaurant sx={{ fontSize: 16 }} />}
                        {activity.type === 'review' && <RateReview sx={{ fontSize: 16 }} />}
                        {activity.type === 'user' && <Person sx={{ fontSize: 16 }} />}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={activity.message}
                      secondary={activity.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default Dashboard;