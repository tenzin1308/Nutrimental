import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, { useState } from 'react';




export default function NutrientAdvice() {

    const [searchText, setSearchText] = useState('');
    
    const searchHandler = () => {
        console.log('searchHandler', searchText);
    }
    const clearTextHandler = () => setSearchText('');
    
    
    return (
        <Paper
            // component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
            // onSubmit={searchHandler}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                id="how-can-i-help-you"
                placeholder='How Can I Help You?'
                inputProps={{ 'aria-label': 'How Can I Help You?' }}
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText ? searchText : ''}
            />
            {searchText !== '' &&
                <IconButton aria-label='delete' onClick={clearTextHandler}>
                    <HighlightOffIcon />
                </IconButton>
            }
            <IconButton aria-label="search" onClick={searchHandler}>
                <SearchIcon />
            </IconButton>
            
        </Paper>
  )
}
