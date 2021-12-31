import React from "react";
import { useFieldArray } from "react-hook-form";
import { Box, IconButton } from '@mui/material'
import { Add as AddIcon, Clear as DeleteIcon } from '@mui/icons-material'

const Definitions= ({ nestIndex, control, register }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `meaning.${nestIndex}.definitions`
  });

  return (
    <div style={{alignItems: 'center'}}>
      {fields.map((item, k) => {
        return (

          <Box key={item.id} sx={{
            p: 2,
            borderRadius: 2,
            mt: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#F1F1FD'
          }}>
            <div style={{ display: 'flex'}}>
            <div style={{ flexGrow: 2}}>
            <input
              {...register(`meaning.${nestIndex}.definitions.${k}.definition`, {
                required: true
              })}
              style={{ marginRight: "25px" }} placeholder="Definition"
            />

            <input {...register(`meaning.${nestIndex}.definitions.${k}.synonyms`)} placeholder="Synonyms" />
            </div>
            
            <DeleteIcon sx={{ borderRadius: 2, p: 1, color: '#111b69', fontSize: '2.2rem'}}
            onClick={() => remove(k)}/>
            </div>


            <IconButton sx={{
              borderRadius: 2,
              p: 1,
              color: '#fff',
              background: theme => theme.palette.pink,
            }}
              onClick={() =>
                append({
                  definition: "",
                  synonyms: ""
                })
              }>
              <AddIcon />
            </IconButton>

          </Box>
        );
      })}
    </div>
  );
};

export default Definitions;
