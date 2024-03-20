import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TodoListIcon from './TodoListIcon';
import CheckIcon from '@mui/icons-material/Check';
import CustomCheckbox from './CustomCheckbox'; // Import the custom checkbox component


export default function CheckboxList() {
    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: '#25273c', paddingBottom: '0px', paddingTop: '0px' }} className='todo-container'>
            {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                    <><ListItem
                        key={value}
                        secondaryAction={<IconButton edge="end" aria-label="comments">
                        </IconButton>}
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(value)} >
                            <ListItemIcon>
                            <CustomCheckbox // Use the custom checkbox component
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }} 
                                    sx={{ color: '#ffffff' }}
                                />
                                {/* <TodoListIcon /> */}
                            </ListItemIcon>

                            <ListItemText
                                id={labelId}
                                primary={`Line item ${value + 1}`}
                                primaryTypographyProps={{ style: { fontFamily: 'Josefin Sans', fontWeight: 'unset', color: '#cacbe2' } }} // Apply fontFamily using TypographyProps
                            />
                        </ListItemButton>
                    </ListItem>{value !== 6 && <Divider className='divider' component="li" />}</>


                );
            })}
        </List>
    );
}