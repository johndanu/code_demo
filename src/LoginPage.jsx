import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Avatar,
  Paper,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Imageicon from './assets/code.webp';

export default function LoginPage({ setIsLoggedIn }) {
    const navigate = useNavigate();
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
    onSubmit: (values) => {
      console.log('Form data:', values);
      setIsLoggedIn(true); // Update the login state in the parent component
      localStorage.setItem('isLoggedIn',true) // Set the login state to true
       navigate(-1);

      
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
}
