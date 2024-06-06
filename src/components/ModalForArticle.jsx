import React, { useContext, useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

import { Modal } from 'react-bootstrap'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const ModalForArticle = ({ openModal,add, handleModal,article, getArticles, setOpenModal }) => {
  const { userData, token } = useContext(AuthContext)

 

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        content: Yup.string().required('Content is required'),
      });
     
    const addArticle = (data) => {
        axios.post(`${process.env.REACT_APP_API_URL}article`, data)
          .then((res) => {
            setOpenModal(false)
            getArticles()
          }).catch((err) => { console.log(err) })
      }

      const handleEdit = (data) => {
        axios.put(`${process.env.REACT_APP_API_URL}article/${article?.id}`, data)
        .then((res)=>{
            handleModal()
            getArticles()
        }).catch((err)=>{
            console.log(err)
        })
      };
    

  return (
    <Modal show={openModal} onHide={handleModal}>
    <Modal.Header closeButton>
      <Modal.Title>{add?"Add Article":"Edit Article"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Formik
        initialValues={{
          title: article?.title ||'',
          content:article?.content|| '',
          userId:userData?.id,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if(add){
            addArticle(values)
          }else{
            handleEdit(values)
          }
        }}
      >
        {({ handleSubmit, handleChange, values }) => (
          <Form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label className='form-label fs-5 fw-semibold'>Title:</label>
              <Field
                as={TextField}
                type='text'
                name='title'
                placeholder='Enter article title'
                className='form-control'
                value={values.title}
                onChange={handleChange}
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
                as={TextField}
                type='textarea'
                name='content'
                placeholder='Enter article content'
                className='form-control'
                multiline
                rows={6}
                value={values.content}
                onChange={handleChange}
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
              className='fs-5 text-capitalize'
            >
              {add?"Add Article":"Edit Article"}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal.Body>
  </Modal>
  )
}

export default ModalForArticle