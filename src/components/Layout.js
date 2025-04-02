import React from 'react'
import { AppBar , Toolbar , Typography, Container , Button} from '@mui/material';
import { Outlet , useNavigate } from 'react-router-dom';
import useStateContext from '../hooks/useStateContext';

export default function Layout() {

const { resetContext } = useStateContext();
const navigate = useNavigate();

const logout = () => {
  resetContext();
  navigate('/');
}

  return (
    <>
    <AppBar position="sticky">
      <Toolbar sx={{ with: 640, m : 'auto' }}>
        <Typography 
        variant="h4"
        align="center">
          Harry Potter Quiz App
        </Typography>
        <Button onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
      <Container>
        <Outlet/>
      </Container>
    </>
  )
}
