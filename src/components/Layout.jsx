import { AppBar, Button, useMediaQuery } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useTheme } from '@emotion/react'

const Layout = ({ children }) => {
    const navigate = useNavigate()
    const {token,clearAuthData} = useContext(AuthContext)
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const handleLogout = ()=>{
        clearAuthData()
        navigate('/login')
    }
    const handleLogin = ()=>{
        navigate('/login')
    }
  return (
    <div>
      <AppBar position="static" className=''>
        <div className='d-flex justify-content-between align-items-center'>
            <Button variant='contained' onClick={() => navigate('/')}
            className='fs-2 fw-bolder ms-3 cursor-pointer p-0'>CMS</Button>
        {
           !isMobile &&   (
            token ? <div className='d-flex align-items-center me-3'>
            <Button variant='contained' onClick={() => navigate('/articles/all')}
            className='fs-6 fw-semibold cursor-pointer text-capitalize'>My Article</Button>
            <Button variant='contained' onClick={() => navigate('/createArticle')}
            className='fs-6 fw-semibold cursor-pointer text-capitalize'>Create New</Button>
            <Button onClick={handleLogout} variant='contained' 
            className='fs-6 fw-semibold cursor-pointer text-capitalize'>Log Out</Button>
            
        </div>
        :
        <div className='d-flex align-items-center me-3'>
            <Button onClick={handleLogin}  variant='contained' 
            className='fs-6 fw-semibold cursor-pointer text-capitalize'>Log In</Button>
        </div>
           )
        }
        </div>
      </AppBar>
      <main>{children}</main>
    </div>
  )
}

export default Layout