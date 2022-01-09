import { useState } from 'react'
import { Box, Typography, FilledInput,
    //  IconButton, 
     useTheme } from '@mui/material'
import { Search as SearchIcon,
    //  Bookmark as BookmarkIcon
    } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'

import './home.styles.scss'

const Home = () => {
    // word= state, setWord = function used to update the state
    const [word, setWord] = useState("")
    const history = useHistory()
    const theme = useTheme()

    const handleSubmit = (event) => {
        event.preventDefault();
        const trimmedWord = word.trim().toLowerCase(); // removes extra spacing
        if(!trimmedWord || trimmedWord.split(' ').length >1) return;
        history.push(`/search/${trimmedWord}`);
    }

    return (
        <Box sx={{ ...theme.mixins.centerBlockStyle }}>
            <img className ="home-image" src="/assets/surfing.svg" alt="Book_Reading"/>
            <Typography  sx={{
                    mt: 3,
                    mb: 1
                }} variant ="h4"> 4 DefSyn </Typography>
            <Typography color="GrayText"> Find words and their synonyms</Typography>
<Box sx={{ width: '360px' }}>
    <form onSubmit={handleSubmit}>
            <FilledInput 
            value={word}
            onChange ={event => setWord(event.target.value)}
            disableUnderline placeholder="search"
            sx={{
                my: 4,
                backgroundColor: 'white',
                borderRadius: 2,
                boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                '& .MuiFilledInput-input': {
                    p: 2,
                },
                ":hover": {
                    backgroundColor: "#ECF0F6"
                  }
            }}
            startAdornment= {<SearchIcon color="disabled" />}
            fullWidth
            />
            </form>
            </Box>
            {/* <IconButton sx={{
                borderRadius: 2,
                p: 2,
                color: '#fff',
                background: theme => theme.palette.pink,
                boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)'
            }}>
                <BookmarkIcon />
            </IconButton> */}
        </Box>
    )
}

export default Home
