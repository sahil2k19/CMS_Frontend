import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SinglePublicArticle = () => {
    const {id} = useParams()
    const [articleData, setArticleData] = useState({})
    const getArticle = () => {
        axios.get(`${process.env.REACT_APP_API_URL}article/${id}`)
        .then((res) => {
            setArticleData(res.data.result)
        }).catch((err) => {
            console.log(err)
        })  
    }

    useEffect(() => {
        getArticle()
    }, []);
  return (
    <>
        <div className='container'>
            <div className='d-flex mb-4 mt-4 justify-content-center align-content-center'>
                <h1>{articleData?.title}</h1>
            </div>
            <div className='mb-4'>
                <div dangerouslySetInnerHTML={{ __html: articleData?.paragraph }} />
            </div>
            <div className='mb-4 bg-light rounded-3 py-2 px-4'>
                <h4>Tags</h4>
              {articleData?.tags?.length>0?articleData?.tags?.map((tag, index) => (
                <span key={index} className="badge bg-secondary me-2">{tag?.title}</span>
              )):"No Tags Added"}
            </div>
        </div>
    </>
  )
}

export default SinglePublicArticle