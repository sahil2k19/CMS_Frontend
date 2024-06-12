import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Autocomplete, MenuItem, Select, TextField } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateNewArticleRight = ({articleData, setArticleData}) => {
  const [value, setValue] = useState(0);
  // const [editorContent, setEditorContent] = useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditorChange = (content) => {
    // setEditorContent(content);
    setArticleData(prevState => ({ ...prevState, paragraph: content }));
  };

  const handleVisibilityChange = (event) => {
    setArticleData(prevState => ({ ...prevState, visibility: event.target.value }));
  };

  const handleCategoryChange = (event) => {
    setArticleData(prevState => ({ ...prevState, Category: [event.target.value] }));
  };

  const handleTagsChange = (event, newValue) => {
    setArticleData(prevState => ({ ...prevState, tags: newValue }));
  };

  const handleTitleChange = (event) => {
    setArticleData(prevState => ({ ...prevState, title: event.target.value }));
  };
  // useEffect(()=>{
  //   // setEditorContent(articleData?.paragraph)
  // },[articleData])

  const modules = {
    toolbar: [
      [{ 'font': [] }, { 'size': [] }],
      ['bold', 'italic', 'underline'],
      ['link']
    ],
  };

  return (
    <>
      <div className=''>
        <div>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Post" className='fs-5 fw-bolder text-capitalize'/>
            <Tab label="Block" className='fs-5 fw-bolder text-capitalize'/>
          </Tabs>
        </div>

        {value === 0 ?
          <div>
            {/* Status & Visibility */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='fs-6 fw-bolder'>
                Visibility
              </AccordionSummary>
              <AccordionDetails>
                <div className='row align-items-center'>
                  <div className='col-4'>
                    <span className='fs-6 fw-semibold'>Visibility</span>
                  </div>
                  <div className='col-8'>
                    <Select
                      variant="standard"
                      className='text-primary fw-bolder'
                      value={articleData.visibility}
                      onChange={handleVisibilityChange}
                    >
                      <MenuItem value={"Public"}>Public</MenuItem>
                      <MenuItem value={"Private"}>Private</MenuItem>
                    </Select>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* Category */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='fs-6 fw-bolder'>
                Category
              </AccordionSummary>
              <AccordionDetails>
                <div className='row align-items-center'>
                  <div className='col-12'>
                    <Select
                      variant="standard"
                      className='fw-semibold w-100'
                      value={articleData?.Category[0] || ""}
                      onChange={handleCategoryChange}
                    >
                      <MenuItem variant="standard" className='fw-semibold w-100' value={"Text Posts"}>Text Posts</MenuItem>
                    </Select>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            {/* Tags */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='fs-6 fw-bolder'>
                Tags
              </AccordionSummary>
              <AccordionDetails>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  options={tags}
                  getOptionLabel={(option) => option.title}
                  value={articleData.tags}
                  onChange={handleTagsChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      placeholder="update"
                    />
                  )}
                />
              </AccordionDetails>
            </Accordion>
          </div> :
          <div>
            {/* Title */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='fs-6 fw-bolder'>
                Title
              </AccordionSummary>
              <AccordionDetails className=''>
                <div className='row align-items-center'>
                  <TextField
                    variant="outlined"
                    InputProps={{ style: { fontWeight: 'bold', fontSize:"28px" } }}
                    value={articleData.title}
                    onChange={handleTitleChange}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            {/* Paragraph */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='fs-6 fw-bolder'>
                Paragraph
              </AccordionSummary>
              <AccordionDetails>
                <div className='row align-items-center'>
                  <ReactQuill 
                    value={articleData?.paragraph} 
                    onChange={handleEditorChange} 
                    modules={modules} 
                    formats={['font', 'size', 'bold', 'italic', 'underline', 'link']} 
                  />
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        }
      </div>
    </>
  )
}

const tags = [
  { title: "Announcement" },
  { title: "Update" },
  { title: "Opinion" },
  { title: "Photo" },
  { title: "Infographic" },
  { title: "Meme" },
  { title: "Video" },
  { title: "Vlog" },
  { title: "Live Stream" },
  { title: "Podcast" },
  { title: "Music" },
  { title: "Article" },
  { title: "Resource" },
  { title: "Poll" },
  { title: "Quiz" },
  { title: "Survey" },
  { title: "Event" },
  { title: "Reminder" },
  { title: "Ad" },
  { title: "Sale" },
  { title: "Review" },
  { title: "How-To" },
  { title: "Tutorial" },
  { title: "Informational" },
  { title: "Story" },
  { title: "Milestone" },
  { title: "Thank You" },
  { title: "Question" },
  { title: "Challenge" },
  { title: "Contest" },
  { title: "Quote" },
  { title: "Success Story" },
  { title: "Uplifting" }
];

export default CreateNewArticleRight;
