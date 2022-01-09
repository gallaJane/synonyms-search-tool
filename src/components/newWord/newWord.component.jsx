import React from "react";
import { useForm } from "react-hook-form";
import FieldArray from '../fieldArray/fieldArray.component';
import { Button, Box, useTheme, Typography } from '@mui/material'
import { useHistory } from 'react-router-dom'


import "./newWord.styles.css";



const defaultValues = {
    name: "",
    meaning: [
      {
        partOfSpeech: [""],
        definitions: [{ definition: "", synonyms: [""] }]
      }
    ]
  };


const NewWord = () => {
    const theme = useTheme()
    const history = useHistory()

    const {
        control,
        register,
        handleSubmit,
        getValues,
        errors,
        setValue
      } = useForm({
        defaultValues
      });
      const onSubmit = (data) => alert(JSON.stringify(data));
    return (
        <Box sx={{ ...theme.mixins.centerBlockStyle}}>    
        <form onSubmit={handleSubmit(onSubmit)}>
<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', alignContent: 'center', justifyContent: 'space-between'}}>

        <h1>Word Form</h1>
        {/* <input type="submit" /> */}
         <div style={{ alignContent: 'flex-end'}}>
        <Button  sx={{ textTransform: 'capitalize', mt: 2, mr: 1, background:'transparent', color: '#6FB492' }} onClick={() => { history.push('/') }}>Cancel</Button>
        <Button type="submit" variant="contained" sx={{ textTransform: 'capitalize', mt: 2, color: 'white' }}>Save</Button>
        </div>
        </div>
        <Typography variant="body2" color="GrayText" sx={{ mb: 3 }}>Here you can define a new word with it's synonyms.
          fields.</Typography>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <input {...register(`name`, {
                required: true
              })} placeholder ="Enter word" />
  
        <FieldArray
          {...{ control, register, defaultValues, getValues, setValue, errors }}
        />

        </div>
  
        {/* { <button type="button" onClick={() => reset(defaultValues)}>
          Reset
        </button> } */}
  
     
      </form>
      </Box>
    )
}

export default NewWord