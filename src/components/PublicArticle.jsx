import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Card, CardContent, Chip, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PublicArticle = () => {
    const navigate = useNavigate();
    const { userData } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [loader, setLoader] = useState(true);
    const getAllArticles = () => {
      setLoader(true)
      axios.get(`${process.env.REACT_APP_API_URL}article/all`)
        .then((res) => {
          setLoader(false)
          setArticles(res.data.result);
        }).catch((err) => { 
          setLoader(false);
           console.log(err) 
          });
    };
  
    const cardClick = (id) => {
      navigate(`/public/article/${id}`)
    }
  
    useEffect(() => {
      getAllArticles();
    }, []);
  return (
    <>
        <div>
            <div className='d-flex justify-content-center'>
                <h1>All Articles</h1>
            </div>
            <div className='row container'>
            {loader?<div className='d-flex justify-content-center'>
            <CircularProgress />
          </div>:
           articles?.length > 0 && !loader ? articles?.map(article => {
              return (
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 px-3 py-2 position-relative' key={article.id}>
                  <Chip clickable  className='' style={{position:'absolute', right:'0px', top:'-13px'}}  label={article?.visibility}/>
                  <Card onClick={() => cardClick(article?.id)} className='cursor-pointer'>
                    <CardContent>
                      <h3 className='fs-4 article-title-new'>{article?.title}</h3>
                      <div 
                        className="article-content"
                        dangerouslySetInnerHTML={{ __html: article?.paragraph }} 
                      />
                    </CardContent>
                  </Card>
                </div>
              )
            }):<div className='d-flex justify-content-center'>
              <h1 className='me-5'>No Articles Found</h1>
              <Button onClick={() => navigate('/createArticle')} variant='contained' size='small' color='primary' className='m-0'>
                        <span className='fs-6 fw-semibold text-capitalize'>Create New</span>
                    </Button>    
            </div>
          }
            </div>
        </div>
    </>
  )
}

export default PublicArticle