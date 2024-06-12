import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, Card, CardContent } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ShowAllArticles = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);

  const getAllArticles = () => {
    axios.get(`${process.env.REACT_APP_API_URL}article/all/${userData?.id}`)
      .then((res) => {
        setArticles(res.data.result);
      }).catch((err) => { console.log(err) });
  };

  const cardClick = (id) => {
    navigate(`/articles/${id}`)
  }

  useEffect(() => {
    getAllArticles();
  }, []);

  return (
    <>
      <Button size='small'  onClick={() => navigate('/')} color='primary' variant='contained' className='p-0 m-0'>
        <ArrowBackIcon className='m-0 p-0' sx={{ fontSize: "30px" }} />
      </Button>
      <div className='container mt-5'>
        <div className='row'>
          {
            articles?.map(article => {
              return (
                <div className='col-12 col-sm-6 col-md-4 col-lg-3 px-3 py-2' key={article.id}>
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
            })
          }
        </div>
      </div>
    </>
  )
};

export default ShowAllArticles;
