import React from 'react';
import { withStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';

const CustomCheckbox = withStyles((theme) => ({
  root: {
    '&:hover': {
      '& .iconStyle': {
        borderColor: '#61dafb', // Change border color on hover
        width: '40px', // Increase width on hover
        height: '40px', // Increase height on hover
      },
    },
    transition: 'width 0.3s, height 0.3s, border-color 0.3s', // Add transition for smooth size change
  },
}))((props) => (
  <Checkbox
    icon={<div className='iconStyle' style={{  }} />}
    checkedIcon={<div className='checkBoxStyle'><CheckIcon fontSize='small' style={{ color: 'white', width: '60%', height: '60%' }} /></div>}
    {...props}
  />
));

export default CustomCheckbox;
