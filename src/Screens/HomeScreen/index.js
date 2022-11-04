import React, { useState, useEffect } from 'react';
import './style.css';
import moment from 'moment';

// Components
import CHeader from '../../Components/CHeader/CHeader';
import { BootstrapButton, style } from '../../Helpers/Helpers';

// Material UI
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';

// Function
import { getArticleList, getUser, createArticle } from '../../Functions/functions';

export default function HomeScreen() {
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [checked, setChecked] = useState(true);
  const [tags, setTags] = useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleGetArticle(0);
    getUser().then((response) => {
      setUser(response)
    });
  }, []);

  /**
   * Handle Get Article
   * @param {Number} pages 
   */
  const handleGetArticle = (pages) => {
    getArticleList(pages).then((response) => {
      if (response) {
        setArticle(response?.data);
        setPagination(response?.total);
      } else {
        setArticle([]);
      }
    });
  }

  /**
   * Handle On Change Pagination Page
   * @param {Object} _ 
   * @param {Number} index 
   */
  const handleOnchange = (_, index) => {
    setArticle([]);
    handleGetArticle(index);
  }

  /**
   * Handle On Change Text Article
   * @param {String} val 
   */
  const handleOnchangeText = (val) => {
    setContent(val.target.value);
  }

  /**
   * Handle Upload Article 
   */
  const handleUploadArticle = async () => {
    try {
      if (content !== '' && tags.length !== 0) {
        const result = await createArticle(content, tags);

        if (result.status === 200) {
          handleClose();
          setArticle([]);
          setTags([])
          handleGetArticle(0);
        } else {
          // handle error if failed post to API
        }
      } else {
        // handle if user not fill the article
      }
    } catch (error) {
      console.log('error@handleUploadArticle');
    }
  }

  const handleOnChangeCheck = (event, element) => {
    if (tags.includes(element)) {
      const newArr = tags.splice(element, 1);
      
      setTags(newArr)
    } else {
      setChecked(event.target.checked);
      setTags([...tags, element])
    }
  }

  return (
    <div className='home-container'>
      <CHeader openModal={handleOpen} />
      <div className='home-content-conteiner'>
        <div className='home-content'>
          <p className='main-title'>Articles</p>
          <Divider sx={{ marginTop: 1 }} />

          {article && article.length !== 0 ? (
            article.map((value, _) => {
              const tags = value?.tags;

              return (
                <div className='card-article-container' key={value?.id}>
                  {/** Author Container */}
                  <div className='author-container'>
                    <div className='avatar-container'>
                      <Avatar alt="Remy Sharp" src={value?.owner?.picture} />
                    </div>
                    <div>
                      <p className='author-title'>{value?.owner?.title}</p>
                      <p className='author-name'>{value?.owner?.firstName} {value?.owner?.lastName}</p>
                      <p className='author-date'>{moment(value?.publishDate).format("MMMM dddd YYYY")}</p>
                    </div>
                    <div className='thumb-container'>
                      <p className='thumb-text'>{value?.likes}</p>
                      <ThumbUpAltRoundedIcon />
                    </div>
                  </div>

                  {/** Content Article Container */}
                  <div className='content-article-container'>
                    <div className='content-article'>
                      <p className='content-text'>{value?.text}</p>
                    </div>
                    <div className='image-article'>
                      <img
                        src={value?.image}
                        alt='post-article'
                        className='image-article-post'
                      />
                    </div>
                  </div>

                  {/** Tags Article */}
                  <div className='tags-content-container'>
                    {tags.map((val, _) => {
                      return (
                        <div className='tags-container' key={val?.id}>
                          <p className='tags-text'>{val}</p>
                        </div>
                      )
                    })}
                  </div>
                  <Divider sx={{ marginTop: 4 }} />
                </div>
              )
            })
          ) : (
            <div>
              {/** Skeleton Loading */}
              {[1, 2, 3].map((_) => {
                return (
                  <React.Fragment>
                    <div>
                      <Stack spacing={2} sx={{ marginTop: 4 }}>
                        <Skeleton variant="circular" width={50} height={50} />
                        <Skeleton variant="rectangular" width={510} height={60} />
                        <Skeleton variant="rounded" width={310} height={60} />
                        <Skeleton variant="rounded" width={710} height={60} />
                      </Stack>
                    </div>
                    <Divider sx={{ marginTop: 5 }} />
                  </React.Fragment>
                )
              })}
            </div>
          )}
        </div>

        {/** Side Conntent Container */}
        <div className='home-content-side'>
          <p className='interested-text'>People you might be interested</p>
          {user && user.length !== 0 ? (
            user.map((value, _) => {
              return (
                <div className='author-container'>
                  <div className='avatar-container'>
                    <Avatar alt="Remy Sharp" src={value?.picture} />
                  </div>
                  <div>
                    <p className='author-title'>{value?.title}</p>
                    <p className='author-name'>{value?.firstName} {value?.lastName}</p>
                  </div>
                </div>
              )
            })
          ) : (
            [1, 2, 3].map((_) => {
              return (
                <React.Fragment>
                  <div>
                    <Stack spacing={2} sx={{ marginTop: 2 }}>
                      <Skeleton variant="circular" width={20} height={20} />
                      <Skeleton variant="rectangular" width={210} height={20} />
                      <Skeleton variant="rounded" width={110} height={20} />
                      <Skeleton variant="rounded" width={310} height={20} />
                    </Stack>
                  </div>
                  <Divider sx={{ marginTop: 2 }} />
                </React.Fragment>
              )
            })
          )}

          {/** Popular Tags */}
          <p className='interested-text'>Popular Tags</p>
        </div>
      </div>

      {/** Pagination */}
      <Stack spacing={2} sx={{ marginBottom: 10, paddingLeft: 38 }}>
        <Pagination count={pagination} variant="outlined" shape="rounded" onChange={handleOnchange} />
      </Stack>

      {/** Modal Create Article */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextareaAutosize
            aria-label="maximum height"
            placeholder={'Tulis Article...'}
            defaultValue=""
            onChange={handleOnchangeText}
            style={{ width: '100%', height: 200, fontFamily: 'Poppins', fontWeight: 500, lineHeight: 2, marginBottom: 14 }}
          />
          <div className='checkbox-main-container'>
            {['Life Style', 'Student', 'Fashion', 'Animal', 'Adventure'].map((element) => {
              const isChecked = tags.includes(element)

              return (
                <div className='checkbox-container'>
                  <Checkbox checked={isChecked} onChange={(event) => handleOnChangeCheck(event, element)}/>
                  <p>{element}</p>
                </div>
              )
            })}
          </div>
          <BootstrapButton variant="contained" disableRipple onClick={() => handleUploadArticle()}>
            <p>Upload Article</p>
          </BootstrapButton>
        </Box>
      </Modal>

    </div>
  )
}