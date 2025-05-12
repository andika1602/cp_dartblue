// src/pages/Login.js
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import api from '../axiosConfig';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      alert(res.data);
      window.location.href = '/'; // redirect ke dashboard
    } catch (err) {
      alert(err.response?.data || 'Login failed');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        mt={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} width="100%">
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
        <Box mt={2}>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
          >
            Belum punya akun? Daftar di sini
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
