import { TextField } from '@mui/material'
import React from 'react'

const Register = () => {
  return (
    <div className='container'>
    <div classname='d-flex flex-column align-items-center justify-content-center '>
      <div className='py-4'>
      <h1 className='text-center'>Register</h1>
      </div>
      <div className='d-flex justify-content-center py-4  shadow rounded-4'>
          <form>
            <div classname='row'>
            <div className='col-12 mb-4'>
                <TextField id="outlined-basic" label="User Name" variant="outlined" />
              </div>
              <div className='col-12 mb-4'>
                <TextField id="outlined-basic" label="Email" variant="outlined" />
              </div>
              <div className='col-12 mb-4'>
                <TextField id="outlined-basic" label="Password" variant="outlined" />
              </div>
            </div>
          </form>
      </div>
    </div>

  </div>
  )
}

export default Register