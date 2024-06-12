import { Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const CreateNewArticleLeft = ({ articleData, setArticleData, loader }) => {
  const {id} = useParams()
  const navigate = useNavigate();
  const { userData, token,clearAuthData } = useContext(AuthContext)
  
  // const [editorContent, setEditorContent] = useState('');

  // useEffect(() => {
  //   setEditorContent(articleData?.paragraph);
  // }, [articleData]);

  const handleEditorChange = (content) => {
    setArticleData((prevData) => ({ ...prevData, paragraph: content }));
  };

  const handleTitleChange = (event) => {
    setArticleData((prevData) => ({ ...prevData, title: event.target.value }));
  };


  const handleSave = ()=>{
    if(id){
      handleUpdate()
    }else{
      handleCreate()
    }
  }
  const checkEmpty = ()=>{
    if(!articleData?.title || !articleData?.paragraph){
      return true
    }
  }

  const handleCreate = ()=>{
    if(checkEmpty()){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required',
      })
      return 
    }
    axios.post(`${process.env.REACT_APP_API_URL}article` ,{...articleData, userId:userData?.id})
    .then((res)=>{
      navigate('/articles/all')
    }).then((res)=>{

      Swal.fire("Saved!", "", "success");
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleUpdate = ()=>{
    if(checkEmpty()){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required',
      })
      return 
    }
    axios.put(`${process.env.REACT_APP_API_URL}article/${id}` ,{...articleData, userId:userData?.id})
    .then((res)=>{
      navigate('/articles/all')
    }).then((res)=>{

      Swal.fire("Updated!", "", "success");
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const handleDelete = ()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}article/${id}`)
        .then((res)=>{
          navigate('/articles/all')
        }).then((res)=>{

          Swal.fire("Deleted!", "", "success");
      })}})
    }

  return (
    <>
      <div className='d-flex justify-content-end'>
        <Button size='small' onClick={handleSave} variant='contained' color='success' className=' fs-6 me-3 text-capitalize fw-semibold'>{id?"Save":"Create"}</Button>
        {id &&<Button disabled={loader} size='small' onClick={handleDelete} variant='contained' color='error' className=' fs-6 text-capitalize fw-semibold'>Delete</Button>}
      </div>
      <div>
        <div className='d-flex justify-content-center mt-4'>
       {loader?<div className='d-flex justify-content-center '>
        <CircularProgress/>
       </div>
       :
         <input value={articleData?.title} className='fs-1 fw-bolder ' style={{background:'transparent', border:'none', outline:'none'}} onChange={handleTitleChange} placeholder='Enter Your Title Here'/>

       }
 </div>
        <div className='mt-4 mb-5 mx-5' style={{ borderBottom: '1px solid grey' }}></div>

        <div className='px-5'>
          <ReactQuill
            style={{ background: 'white' }}
            value={articleData?.paragraph}
            onChange={handleEditorChange}
            className='mb-5'
          />
          <div className='border rounded-4 p-4 bg-light'>
          <h4 className='fs-4 fw-bold mb-4'>Tags</h4>
          <div>
              {articleData?.tags?.length>0?articleData?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">{tag?.title}</span>
              )):"No Tags Added"}
            </div>
        </div>
        </div>
        
      </div>
    </>
  );
};

export default CreateNewArticleLeft;
