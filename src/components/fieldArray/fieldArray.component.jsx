import React from "react";
import { useFieldArray } from "react-hook-form";
import Definitions from '../nestedFieldArray/nestedFieldArray.component';
import { Box, IconButton } from '@mui/material'
import { Add as AddIcon, Clear as DeleteIcon } from '@mui/icons-material'



export default function Fields({ control, register, setValue, getValues }) {
  const { fields, remove } = useFieldArray({
    control,
    name: "meaning"
  });



  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <Box sx={{
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
              p: 2,
              borderRadius: 2,
              mt: 3,
              backgroundColor: '#fff'
            }}>

              <li key={item.id}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                  <input style={{ borderColor: '#F1F1FD' }} {...register(`meaning.${index}.partOfSpeech`)} placeholder="Part of Speech" />

                  <DeleteIcon sx={{ borderRadius: 2, p: 1, color: '#111b69', fontSize: '2.2rem' }}
                    onClick={() => remove(index)} />
                </div>

                <Definitions nestIndex={index} {...{ control, register }} />
              </li>
            </Box>
          );
        })}
      </ul>

      <IconButton sx={{
        mt: 2,
        borderRadius: 2,
        p: 1,
        color: '#fff',
        background: theme => theme.palette.pink,
      }}
        onClick={() => {
          setValue("meaning", [
            ...(getValues().meaning || []),
            {
              partOfSpeech: [null],
              definitions: [{ definition: "", synonyms: [""] }]
            }
          ]);
        }}>
        <AddIcon />
      </IconButton>

      {/* <Button  variant="contained" 
            sx={{ textTransform: 'capitalize', mt: 2, color: 'white' }}
                        onClick={() => {
              setValue("meaning", [
                ...(getValues().meaning || []),
                {
                  partOfSpeech: [null],
                  definitions: [{ definition: "", synonyms: [""] }]
                }
              ]);
            }}>Save</Button> */}

    </>
  );
}
