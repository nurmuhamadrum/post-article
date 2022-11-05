import React, { useState, useEffect } from 'react';
import './style.css';
import moment from 'moment';
// Components
import CHeader from '../../Components/CHeader/CHeader';
import { BootstrapButton, style } from '../../Helpers/Helpers';
// Material UI Components
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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Tooltip from '@mui/material/Tooltip';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// Function
import {
  getArticleList,
  getUser,
  createArticle,
  deleteArticle,
  editArticle,
  useWindowSize
} from '../../Functions/functions';

export default function HomeScreen() {
  const [article, setArticle] = useState([]);
  const [user, setUser] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([])
  const [idContent, setIdContent] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  /**
   * Handle Open Side Menu Drawer
   * @param {String} anchor 
   * @param {*} open 
   * @returns 
   */
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setState({ ...state, [anchor]: open });
  };

  /**
   * Handle Open & Close Modal
   * @returns 
   */
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setContent('')
    setIsEdit(false)
  };

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

  /**
   * Handle Put Edit Article
   */
  const handleEditArticle = async () => {
    try {
      const result = await editArticle(content, tags, idContent)

      if (result.status === 200) {
        handleClose();
        setArticle([]);
        setTags([])
        handleGetArticle(0);
      } else {
        // handle error if failed edit to API
      }
    } catch (error) {
      console.log('error@handleEditArticle');
    }
  }

  /**
   * Handle Open Modal Edit
   * @param {Object} value 
   */
  const handleOpenModalToEdit = (value) => {
    setContent(value.text)
    setTags(value.tags)
    setIdContent(value.id)
    setIsEdit(true)
    handleOpen()
  }

  /**
   * Handle On Change Check
   * @param {*} event 
   * @param {*} element 
   */
  const handleOnChangeCheck = (event, element) => {
    if (tags.includes(element)) {
      const newArr = tags.splice(element, 1);

      setTags(newArr)
    } else {
      setTags([...tags, element])
    }
  }

  /**
   * Handle Delete Article
   * @param {String} id 
   */
  const handleDeleteArticle = async (id) => {
    try {
      const response = await deleteArticle(id)

      if (response.status === 200) {
        setArticle([]);
        handleGetArticle(0);
      }
    } catch (error) {
      console.log('error@handleDeleteArticle', error);
    }
  }

  /**
   * Render List Side Menu Drawer
   * @param {String} anchor 
   * @returns 
   */
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['User', 'Article', 'Other'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className='home-container'>
      <CHeader openModal={handleOpen} openDrawer={toggleDrawer('left', true)} />

      {/** Side Drawer Menu */}
      <div>
        {['left'].map((anchor) => (
          <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>

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

                    {/** Delete Article */}
                    <Tooltip title="Delete Article">
                      <IconButton aria-label="delete" onClick={() => handleDeleteArticle(value.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>

                    {/** Edit Article */}
                    <Tooltip title="Edit Article">
                      <IconButton aria-label="edit" onClick={() => handleOpenModalToEdit(value)}>
                        <EditRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  </div>

                  {/** Content Article Container */}
                  <div className='content-article-container'>
                    <>
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
                    </>
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

        {/** Pagination Mobile */}
        {useWindowSize() && (
          <Stack spacing={2} sx={{ alignItems: 'center', marginBottom: 2 }}>
            <Pagination count={pagination} variant="outlined" shape="rounded" onChange={handleOnchange} />
          </Stack>
        )}

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
                    <p className='author-title-side'>{value?.title}</p>
                    <p className='author-name-side'>{value?.firstName} {value?.lastName}</p>
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
          <div className='tags-content-container-side'>
            {['Life Style', 'Student', 'Fashion', 'Animal', 'Adventure'].map((val, _) => {
              return (
                <div className='tags-container-side' key={val?.id}>
                  <p className='tags-text-side'>{val}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/** Pagination Desktop */}
      {!useWindowSize() && (
        <Stack spacing={2} sx={{ marginBottom: 10, paddingLeft: 38 }}>
          <Pagination count={pagination} variant="outlined" shape="rounded" onChange={handleOnchange} />
        </Stack>
      )}

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
            defaultValue={content}
            onChange={handleOnchangeText}
            style={{ width: '100%', height: 200, fontFamily: 'Poppins', fontWeight: 500, lineHeight: 2, marginBottom: 14 }}
          />
          <div className='checkbox-main-container'>
            {['Life Style', 'Student', 'Fashion', 'Animal', 'Adventure'].map((element) => {
              const isChecked = tags.includes(element)

              return (
                <div className='checkbox-container'>
                  <Checkbox checked={isChecked} onChange={(event) => handleOnChangeCheck(event, element)} />
                  <p>{element}</p>
                </div>
              )
            })}
          </div>
          <BootstrapButton variant="contained" disableRipple onClick={() => isEdit ? handleEditArticle() : handleUploadArticle()}>
            {isEdit ? (
              <p>Edit Article</p>
            ) : (
              <p>Upload Article</p>
            )}
          </BootstrapButton>
        </Box>
      </Modal>

    </div>
  )
}
