import { Button } from '@mui/material';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Card, Dropdown, Modal } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ModalForArticle from './ModalForArticle';
import axios from 'axios';
const Articles = ({ article , getArticles}) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false)

  const handleModal = () => {
    setOpenModal(!openModal)
  }


  const deleteArticle = () => {
    Swal.fire({
      title: "Are You Sure You Want To Delete?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#dc3545", // Red color
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3498db", // Blue color
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.delete(`${process.env.REACT_APP_API_URL}article/${article?.id}`)
        .then((res)=>{
          Swal.fire("Deleted!", "", "success");
          getArticles()

        }).catch(err=>{
          console.log(err)
        })
      } 
    });
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().required('Content is required'),
  });
  const handleEdit = () => {
    handleModal()
  };

  const navigateToArticle = () => {
    navigate(`/articles/${article?.id}`)
  }
  const getArticleData = (id) => {
    axios.get(`${process.env.REACT_APP_API_URL}article/${id}`)
    .then((res)=>{
        console.log(res.data?.result);
    }).catch((err)=>{
        console.log(err)
    })
  }
 

  return (
    <div>
      <Card style={{height:"300px"}} className=' border-0 shadow rounded-4 article-card-hover' >
        <Card.Header className=' rounded-top-4'>
          <div className='d-flex justify-content-between align-items-center'>
            <Card.Title className=''><h4 className=' fs-4 fw-bold text-capitalize'>{article?.title.slice(0,18)}{article?.title?.length>30 ? "..." : ""}</h4></Card.Title>
            
            <div className='d-flex '>
            <div  className=' p-2 rounded-3 article-card-hover-reverse me-3  cursor-pointer' >

            <EditIcon className='' color='' onClick={handleEdit}/>
            </div>
            <div className='article-card-hover-reverse p-2 rounded-3 cursor-pointer'>

            <DeleteIcon className=''  color='' onClick={deleteArticle}/>
            </div>

            </div>
          </div>
        </Card.Header>
        <Card.Body  onClick={navigateToArticle} className='d-flex justify-content-between flex-column cursor-pointer rounded-5'>
          <blockquote className="blockquote mb-4" >
            <p className=''>
              {article?.content?.slice(0,80)}...
            </p>
          </blockquote>
          <div className='d-flex '>
            <PersonIcon className='fs-3  me-2'/> 
            <h5 className='fs-5 text-capitalize  fw-bold '>{article?.author || "sahil"}</h5>
          </div>
          {/* <Button color='secondary' variant="contained">Read More</Button> */}
        </Card.Body>
      </Card>
      {/* <Modal show={openModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik
            initialValues={{ title: '', content: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // Submit form data
              setSubmitting(false);
            }}
          >
            {({
              isSubmitting,
              
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <div className='mb-3'>
                  <label className='form-label fs-5 fw-semibold'>Title:</label>
                  <Field
                    type='text'
                    name='title'
                    placeholder='Enter article title'
                    className='form-control'
                  />
                  <ErrorMessage
                    name='title'
                    component='div'
                    className='text-danger'
                  />
                </div>
                <div className='mb-3'>
                  <label className='form-label fs-5 fw-semibold'>Content:</label>
                  <Field
                    as='textarea'
                    name='content'
                    placeholder='Enter article content'
                    className='form-control'
                    style={{ height: '200px' }}
                  />
                  <ErrorMessage
                    name='content'
                    component='div'
                    className='text-danger'
                  />
                </div>
                <Button
                  type='submit'
                  variant="contained"
                  color='success'
                  className='fs-5 text-capitalize'
                  
                >
                  Edit Article
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal> */}
      <ModalForArticle openModal={openModal} article={article} add={false} handleModal={handleModal}  getArticles={getArticles} setOpenModal={setOpenModal} />

    </div>
  );
};

export default Articles;