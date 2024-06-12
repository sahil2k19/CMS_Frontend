import { Button } from '@mui/material'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const MainDashboard = () => {
    const {clearAuthData} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogout = ()=>{
        clearAuthData()
        navigate('/login')
    }
  return (
    <>
        <div className='container'>
            <div className='d-flex mb-4 mt-4 justify-content-between align-content-center'>
                <h1 className='fs-2 fw-bolder m-0 p-0'>Main Dashboard</h1>
                <Button onClick={handleLogout} size='small' className='text-capitalize fw-bold fs-6' variant='contained' color='primary'>Log Out</Button>
            </div>

            <hr/>
            <div className='row'>
                <div className='col-6 col-md-4  '>
                    <Button size='small' onClick={() => navigate('/articles/all')} variant='contained' color='primary' className=''>
                        <span className='fs-5 fw-semibold text-capitalize'>All Articles</span>
                    </Button>    
                </div> 
                <div className='col-6 col-md-4  '>
                    <Button onClick={() => navigate('/createArticle')} variant='contained' color='primary' className=''>
                        <span className='fs-5 fw-semibold text-capitalize'>Create New</span>
                    </Button>    
                </div> 
               
            </div>
        </div>
    </>
  )
}

export default MainDashboard