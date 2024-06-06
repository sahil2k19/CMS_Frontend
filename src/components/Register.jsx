import React from 'react';
import { TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (name, email, password) => {
    const data = { name, email, password };
    axios.post(`${process.env.REACT_APP_API_URL}register`, data)
      .then((response) => {
          navigate('/login');
      })
      .catch((error) => {
        console.error('Error during registration:', error);
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleRegister(values.name, values.email, values.password);
      console.log(values.name, values.email, values.password);
    },
  });

  return (
    <div className='container'>
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='py-4'>
          <h1 className='text-center fs-1 fw-bolder'>Register</h1>
        </div>
        <div className='d-flex justify-content-center p-5 bg-light shadow rounded-4'>
          <form onSubmit={formik.handleSubmit}>
            <div className='d-flex flex-column justify-content-center'>
              <div className='mb-4'>
                <TextField
                  id="name"
                  name="name"
                  type="text"
                  label="name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>
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
              <div className='d-flex justify-content-center mb-4'>
                <Button type="submit" className='fw-bolder' variant="contained" color="primary">
                  Register
                </Button>
              </div>
              <div className='d-flex flex-column align-items-center justify-content-center'>
              <span className='text-center mb-2 fs-6 fw-semibold'>Already have an account?</span>
                <Button variant="contained" color="primary" onClick={() => navigate('/login') } className='fw-bolder'>
                  Login
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
