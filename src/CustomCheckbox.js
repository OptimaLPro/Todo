import React from 'react';
import { withStyles } from '@mui/styles';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';

const CustomCheckbox = withStyles((theme) => ({
}))((props) => (
  <Checkbox
    icon={<div className='iconStyle' style={{ borderWidth: '2px', borderColor: props.darkmode ? '#e8e8ea' : '#4c4f6e', }} />}
    checkedIcon={<div className='checkBoxStyle'><CheckIcon fontSize='small' style={{ color: 'white', width: '60%', height: '60%' }} /></div>}
    {...props}
  />
));

export default CustomCheckbox;
