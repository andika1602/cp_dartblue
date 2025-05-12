import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import { Button, Typography, Container, Box } from '@mui/material';

function Dashboard() {
  const [user, setUser] = useState(null);

  // Di frontend Dashboard.js
useEffect(() => {
  api.get('/dashboard')
    .then(res => setUser(res.data))
    .catch(() => window.location.href = '/login');  // Redirect ke login jika unauthorized
}, []);


  const handleLogout = async () => {
    await api.post('/logout');
    window.location.href = '/login';
  };

  if (!user) return <Typography>Loading or unauthorized...</Typography>;

  return (
    <Container maxWidth="sm">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">{user}</Typography>
        <Button onClick={handleLogout} variant="outlined" sx={{ mt: 2 }}>Logout</Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
