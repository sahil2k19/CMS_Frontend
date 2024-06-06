import React, { useContext, useEffect, useState } from 'react'
import Articles from './Articles'
import { Button, TextField } from '@mui/material'

import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import ModalForArticle from './ModalForArticle';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate()
  const { userData, token,clearAuthData } = useContext(AuthContext)
  const [openModal, setOpenModal] = useState(false)
  const [articleArray, setArticleArray] = useState([])



  const getArticles = () => {
    axios.get(`${process.env.REACT_APP_API_URL}article/all/${userData?.id}`)
      .then((res) => {
        setArticleArray(res.data.result)
      }).catch((err) => { console.log(err) })
  }



  const handleModal = () => {
    setOpenModal(!openModal)
  }
  const handleLogout = () => {
    clearAuthData()
    navigate("/login")
  }

  useEffect(() => {
    getArticles()
    // console.log("userData", userData)
  }, [])

  return (
    <>
      <div className='container'>
        <div className='mt-3'>
          <div className='mb-5 d-flex justify-content-between'>
            <h3 className='fs-2 fw-bold ms-3' style={{ color: 'black' }}>All Articles</h3>
            <Button onClick={handleModal} variant='contained' className='fs-5 text-capitalize'>Add Article</Button>
          </div>
          <div className='row px-4 py-4'>
            {articleArray?.map((article) => (
              <div key={article.id} className='col-12 col-md-6 col-lg-4 mb-4'>
                <Articles article={article} getArticles={getArticles} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalForArticle openModal={openModal} add={true} handleModal={handleModal} getArticles={getArticles} setOpenModal={setOpenModal} />
      <div className='d-flex justify-content-center'>
      <Button onClick={handleLogout} variant='contained' className='fs-5 text-capitalize fw-bolder'>Logout</Button>
      </div>
    </>
  )
}

export default Dashboard
