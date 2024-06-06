import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const data = { email, password };
    axios.post(`${process.env.REACT_APP_API_URL}login`, data)
      .then((response) => {
        if (response.data?.token && response.data.result) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userData', JSON.stringify(response.data.result));
          navigate('/');
        } else {
          console.log('Token not found in the response');
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
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
        <div className='d-flex justify-content-center p-5 bg-light shadow rounded-4'>
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
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Login
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
