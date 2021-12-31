import * as React from 'react';
import { useState, useEffect, Fragment } from 'react'
import {
    Stack, Box, Typography, Button, IconButton,
    Divider, CircularProgress, useTheme, Chip,
    Accordion, AccordionSummary, AccordionDetails
} from '@mui/material'
import {
    ArrowBack as BackIcon,
    BookmarkBorder as BookmarkIcon,
    VolumeUp as VolumeUpIcon,
    ExpandMore
} from '@mui/icons-material'

import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const Definition = () => {
    const { word } = useParams();
    const history = useHistory();
    const [definitions, setDefinitions] = useState([])
    const [loading, setLoading] = useState(true)
    const [exist, setExist] = useState(true)
    const [audio, setAudio] = useState(null)

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const theme = useTheme()

    // Definition component
    useEffect(() => {
        const fetchDefinition = async () => {
            try {
                const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                setDefinitions(resp.data)
                console.log(resp.data)
                setLoading(false)
                //check if audio is available
                const phonetics = resp.data[0].phonetics
                if (!phonetics.length) return;
                const urlAudio = phonetics[0].audio.replace('//ssl', 'https://ssl');
                setAudio(new Audio(urlAudio));

            } catch (error) {
                setExist(false)
            }

        }

        fetchDefinition();
    }, [word])


    const handleClick = (e) => {
        const fetchDefinition = async () => {
            try {
                const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${e.target.innerText}`);
                const trimmedWord = e.target.innerText.trim().toLowerCase();
                if (!trimmedWord || trimmedWord.split(' ').length > 1) return;
                history.push(`/search/${e.target.innerText}`);
                setDefinitions(resp.data)
                setLoading(false)
                const phonetics = resp.data[0].phonetics
                if (!phonetics.length) return;
                const urlAudio = phonetics[0].audio.replace('//ssl', 'https://ssl');
                setAudio(new Audio(urlAudio));

            } catch (error) {
                setExist(false)
            }
        }
        fetchDefinition();
    };

    // checking the state of 
    if (!exist) return <Box sx={{ ...theme.mixins.centerBlockStyle }}>
        <img className="home-image" src="/assets/not_found.svg" alt="Book_Reading" />
        <Typography sx={{ mt: 3 }}>No results found for '{word}' </Typography>
        <Typography sx={{ mt: 3 }} variant="body2" color="GrayText" >Please, search for words not phrases</Typography>

        <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 2 }}>
            <IconButton onClick={history.goBack}>
                <BackIcon sx={{ color: 'black' }} />
            </IconButton>
            <Button variant="contained" sx={{ textTransform: 'capitalize', mt: 2, color: 'white' }} onClick={() => { history.push('/new') }}>Add Word</Button>
        </Stack>
    </Box>
    // show loader if loading true
    if (loading) return <Box sx={{ ...theme.mixins.centerBlockStyle }}><CircularProgress /></Box>


    return (
        <div style={{ marginTop: "2em" }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <IconButton onClick={history.goBack}>
                    <BackIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton>
                    <BookmarkIcon sx={{ color: 'black' }} />
                </IconButton>
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{
                background: 'linear-gradient(90.17deg, #402548 0.14%, #321C39 98.58%)',
                boxShadow: '0px 10px 20px rgba(19, 23, 71, 0.25)',
                mt: 3,
                px: 4,
                py: 5,
                color: '#fff',
                borderRadius: 2
            }}>
                <Typography sx={{ textTransform: 'capitalize' }} variant="h5">{word}</Typography>
                {audio && <IconButton onClick={() => audio.play()} sx={{
                    borderRadius: 2,
                    p: 1,
                    color: '#fff',
                    background: theme => theme.palette.pink,
                }}>
                    <VolumeUpIcon />
                </IconButton>}
            </Stack>

            {definitions.map((def, idx) =>
                <Fragment key={idx}>
                    <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }} />
                    {def.meanings.map(meaning =>
                        <Box key={Math.random()} sx={{
                            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                            backgroundColor: '#fff',
                            p: 2,
                            borderRadius: 2,
                            mt: 3
                        }}>
                            <Typography sx={{ textTransform: 'capitalize', textDecorationLine: 'underline', mb: 2 }} color="primary" variant="subtitle1">{meaning.partOfSpeech}</Typography>
                            {meaning.definitions.map((definition, idx) =>


                                //  <Typography sx={{ my: 1 }} variant="body2" color="GrayText" key={definition.definition}> {meaning.definitions.length > 1 && `${idx + 1}. Definition: `}{definition.definition}
                                //      <Box alignItems="center" alignContent="center" >
                                //          <Typography sx={{ textTransform: 'capitalize', mr: 1 }} color="GrayText" variant="subtitle1">Synonyms: </Typography>
                                //         {definition.synonyms.map(synonym =>

                                //              <Chip color="primary" variant="outlined" key={synonym}  sx={{ my: 1, mr: 0.5 }} label={synonym}/>

                                //         )}
                                //      </Box>
                                //  </Typography>

                                <Accordion square expanded={expanded === `panel_${idx}`} onChange={handleChange(`panel_${idx}`)}>
                                    <AccordionSummary expandIcon={<ExpandMore />} aria-controls={`panel_${idx}d-content`} id={`panel_${idx}d-header`}>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <Typography sx={{ my: 1, mr: 1 }} variant="body2" color="GrayText" key={definition.definition}>{meaning.definitions.length > 1 && `${idx + 1}.`}

                                            </Typography>
                                            <Typography sx={{ my: 1 }} variant="body2" color="GrayText">{definition.definition}</Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography sx={{ textTransform: 'capitalize', mr: 1 }} color="GrayText" variant="subtitle1">Synonyms: </Typography>
                                        {definition.synonyms.map(synonym =>

                                            <Chip color="primary" variant="outlined" key={synonym} sx={{ my: 1, mr: 0.5 }} label={synonym}
                                                onClick={handleClick}
                                            />

                                        )}
                                    </AccordionDetails>
                                </Accordion>

                            )}

                        </Box>
                    )}
                </Fragment>
            )}
        </div>
    )
}

export default Definition
