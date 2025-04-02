import React from 'react'
import { Grid } from '@mui/material';

export default function Center(props) {
  return (
    <Grid 
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    sx = {{ minHeight: '100vh' }}
    >
        <Grid item xs={1}>
            {props.children}
        </Grid>
    </Grid>
  )
}
