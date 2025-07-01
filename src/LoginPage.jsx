import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Avatar,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Imageicon from './assets/code.webp';
import { useAuthApi } from './hooks/useAuthApi'; 
import { useState } from 'react';

export default function LoginPage({ setIsLoggedIn }) {
  const { login,api } = useAuthApi(); 
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');



  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      setApiError('');
      setLoading(true);
      try {
        const res = await login(values.email, values.password);
        localStorage.setItem('access_token', res.accessToken); // or however your token is named
        localStorage.setItem('refresh_token', res.refreshToken); // store user info if needed
        localStorage.setItem('isLoggedIn', true);
        // api.apiClient.defaultHeaders['Authorization'] = `Bearer ${res.accessToken}`;
        // api.apiClient.defaultHeaders['x-refresh-token'] = res.refreshToken;
//         console.log("Authorization:", res.headers['authorization']);
// console.log("x-refresh-token:", res.headers['x-refresh-token']);

        api.apiClient.authentications['BearerAuth'].apiKey = `Bearer ${res.accessToken}`;
    api.apiClient.authentications['RefreshTokenHeader'].apiKey = res.refreshToken;
        setIsLoggedIn(true);
        navigate('/syllabus/js'); // change route as needed
      } catch (error) {
        console.error('Login failed:', error);
        setApiError('Invalid email or password.');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper elevation={3} className="p-8 w-full max-w-sm">
        <Typography variant="h5" align="center" color="primary" gutterBottom>
          CODE DEMO
        </Typography>

        <div className="flex justify-center mb-6">
          <Avatar sx={{ width: 100, height: 100 }}>
            <img src={Imageicon} alt="Code Icon" className="w-full h-full object-cover" />
          </Avatar>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="mb-4">
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>

          <div className="mb-4">
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>

          {apiError && (
            <Typography color="error" align="center" className="mb-2">
              {apiError}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
          </Button>
        </form>
      </Paper>
    </div>
  );
}
