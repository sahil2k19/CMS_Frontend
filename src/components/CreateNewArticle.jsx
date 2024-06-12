import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button} from '@mui/material';
import CreateNewArticleLeft from './CreateNewArticleLeft';
import CreateNewArticleRight from './CreateNewArticleRight';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const CreateNewArticle = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const [loader, setLoader] = useState(false);
    const {id} = useParams();
    const [articleData, setArticleData] = useState({
        title: "",
        paragraph:"",
        visibility:"Public",
        Category:[],
        tags:[],
    })
    useEffect(()=>{
      if(id){
        setLoader(true)
        axios.get(`${process.env.REACT_APP_API_URL}article/${id}`)
        .then((res) => {
         setLoader(false)
          setArticleData(res.data.result);
        }).catch((err) => { setLoader(false); console.log(err) });
      }
    },[])
    useEffect(()=>{
      if(id){
        setLoader(true)
        axios.get(`${process.env.REACT_APP_API_URL}article/${id}`)
        .then((res) => {
         setLoader(false)
          setArticleData(res.data.result);
        }).catch((err) => { setLoader(false); console.log(err) });
      }else{
        setArticleData({title:"",paragraph:"",visibility:"Public",Category:[],tags:[]})
      }
    },[location.pathname])

  return (
    <>
     <Button size='small' onClick={() =>
     {
      if(id){

        navigate('/articles/all')
      }else{
        navigate('/')
      }
      }} color='primary'  variant='contained' className='p-0 m-0 me-3'>
            <ArrowBackIcon className=' m-0 p-0 ' sx={{fontSize:"30px"}} />
          </Button>
         
        <div className=''>
            <div className='row'>
                <div className='col-12 col-md-8 border'>
                    <CreateNewArticleLeft articleData={articleData} loader={loader} setArticleData={setArticleData}/>
                </div>
                <div className='col-12 col-md-4 border'>
                    <CreateNewArticleRight articleData={articleData} loader={loader} setArticleData={setArticleData}/>
                </div>
            </div>
        </div>      
    </>
  )
}

export default CreateNewArticle