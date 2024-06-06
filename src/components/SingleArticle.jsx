import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// const article = {
//   id: 3,
//   title: "Lorem Ipsum asdfsafasfsadfdf",
//   content: `Lorem ipsum dolor sit amet, consectetur 
//   adipiscing elit. Integer posuere erat a 
//   ante. sdsfsfsdfsdfsdfsd`,
//   author: "Sahil Gagan"
// }

const SingleArticle = () => {
  const {id} = useParams();

  const [article, setArticle] = useState();

  const getArticleData =()=>{
    axios.get(`${process.env.REACT_APP_API_URL}article/${id}`)
    .then(res=>{
      setArticle(res.data?.result);
    }).catch((err)=>{
      console.log(err)
    })
  }
  
  useEffect(()=>{
    getArticleData()
  },[])
  return (
   <>
    <div className='container'> 
      <div className='d-flex flex-column align-items-center justify-content-center'>
        <div className='mb-3'>
        </div>
        <div className='d-flex justify-content-center align-items-center '>
          <Button sx={{background:"black", color:"white", outline:"none", border:"none"}} color='secondary'  variant='contained' className='p-0 m-0 me-3'>
            <ArrowBackIcon className=' m-0 p-0 ' sx={{fontSize:"40px"}} onClick={() => window.history.back()}/>
          </Button>

          <h1 className='fs-1 fw-bolder mt-5 mb-5'>{article?.title}</h1>
        </div>
        <div className='mb-5'>
          {article?.content?.split('\n').map((line, index) => <p className='fs-4 fw-semibold text-secondary' key={index}>{line}</p>)}
        </div>
        <div>
          <p className='fs-5 fw-semibold'>Author: {article?.author}</p>
        <hr/>
        </div>
      </div>
    </div>
   </>
  )
}

export default SingleArticle