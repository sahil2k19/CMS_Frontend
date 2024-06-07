import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const handleLogin = (email, password) => {
    setLoader(true);
    const data = { email, password };
    axios.post(`${process.env.REACT_APP_API_URL}login`, data)
      .then((response) => {
        setLoader(false);
        if (response.data?.token && response.data.result) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.result));
          window.location.href = '/';
        } else {
          console.log('Token not found in the response');
        }
      })
      .catch((error) => {
        setLoader(false);
        if (error.response) {
        
          if (error.response.status === 400) {
            Swal.fire({
              icon: 'error',
              title: 'User Not Found',
              text: 'The user does not exist. Please check your credentials or sign up.',
            });
          } else if (error.response.status === 401) {
            Swal.fire({
              icon: 'error',
              title: 'Wrong Credentials',
              text: 'The email or password you entered is incorrect.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'An unexpected error occurred. Please try again later.',
            });
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error during login:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred. Please try again later.',
          });
        }
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleLogin(values.email, values.password);
      console.log(values.email, values.password);
    },
  });

  return (
    <div className='container'>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='py-4'>
          <h1 className='text-center fs-1 fw-bolder'>Login</h1>
        </div>
        <div className='d-flex justify-content-center p-5 bg-light shadow rounded-4' style={{minWidth:"300px"}}>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex flex-column justify-content-center'>
              <div className='mb-4'>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className='mb-4'>
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
              <div className='d-flex mb-4 justify-content-center'>
              
             {loader?<CircularProgress sx={{ color: 'black' }} />:   <Button type="submit" className='fw-bolder' variant="contained" color="primary">
                  Login
                </Button>}
              </div>
              <div className='d-flex justify-content-center align-content-center flex-column'>
              <span className='text-center mb-2 fs-6 fw-semibold'>Don't have an account?</span>
                <Button variant="contained" color="primary" onClick={() => navigate('/register')} className='fw-bolder'>
                  Create New Account
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
