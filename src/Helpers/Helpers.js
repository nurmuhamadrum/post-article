import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    color: '#000',
    padding: '5px 18px',
    border: '1px solid',
    lineHeight: 1.5,
    borderRadius: 4,
    backgroundColor: '#F6FBF4',
    borderColor: '#D7E8D0',
    fontFamily: [
        'Poppins',
    ].join(','),
    '&:hover': {
        backgroundColor: '#D7E8D0',
        borderColor: '#D7E8D0',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#D7E8D0',
        borderColor: '#D7E8D0',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});

export const BootstrapButtonHeader = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 14,
    color: '#000',
    padding: '5px 18px',
    border: '1px solid',
    lineHeight: 1.5,
    borderRadius: 14,
    backgroundColor: '#F6FBF4',
    borderColor: '#D7E8D0',
    fontFamily: [
      'Poppins',
    ].join(','),
    '&:hover': {
      backgroundColor: '#D7E8D0',
      borderColor: '#D7E8D0',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#D7E8D0',
      borderColor: '#D7E8D0',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  });

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
};