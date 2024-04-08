import React from 'react';
import { withStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';

const CustomCheckbox = withStyles({
  root: {
    color: 'transparent',
    '&$checked': {
      color: 'transparent',
    },
  },
  checked: {},
})((props) => (
  <Checkbox 
    icon={<div style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid #534566', marginLeft: '10px' }} />}
    checkedIcon={<div style={{ width: 24, height: 24, borderRadius: '50%', background: 'linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '10px' }}><CheckIcon fontSize='small' style={{ color: 'white', width: '60%', height: '60%' }} /></div>}
    {...props}
  />
));

export default CustomCheckbox;
