import React from 'react'
import './style.css'
// Material UI
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';
import { Box } from '@mui/system';
// Helpers
import { BootstrapButtonHeader } from '../../Helpers/Helpers'
// Function
import { useWindowSize } from '../../Functions/functions'

export default function CHeader(props) {
  return (
    <div className='header-container'>
      <IconButton onClick={props.openDrawer} aria-label="menu" sx={useWindowSize() ? { marginLeft: 2 } : { marginLeft: 5 }}>
        <MenuRoundedIcon fontSize="medium" />
      </IconButton>
      <p className='title'>READER</p>
      <div className='header-side-right-container'>
        <Box sx={{ marginRight: 1 }}>
          <IconButton aria-label="menu">
            <NotificationsActiveRoundedIcon />
          </IconButton>
        </Box>
        <BootstrapButtonHeader variant="contained" disableRipple onClick={props.openModal}>
          <EditRoundedIcon fontSize="small" sx={{ marginRight: 1 }} />
          {!useWindowSize() && <p>Write Article</p>}
        </BootstrapButtonHeader>
      </div>
    </div>
  )
}
