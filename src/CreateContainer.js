import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TodoListIcon from './TodoListIcon';

export default function CheckboxList() {
    const [text, setText] = React.useState('Create a new todo...');

    return (
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: '#25273c', marginBottom: '25px' }} className='create-container'>

            <><ListItem
                secondaryAction={<IconButton edge="end" aria-label="comments">
                </IconButton>}
                disablePadding
            >
                <ListItemButton role={undefined}>
                    <ListItemIcon>
                        {/* <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }} 
                                    sx={{ color: '#ffffff', borderRadius: '50%' }}/> */}
                        <TodoListIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary={text}
                        primaryTypographyProps={{ style: { fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#6f7186' } }} // Apply fontFamily using TypographyProps
                    />
                </ListItemButton>
            </ListItem></>

        </List>
    );
}