import React, { useEffect } from 'react';
import { TextField, Button, Box, Card, CardContent, Typography } from '@mui/material';
import Center from './Center';
import { useForm } from '../hooks/useForm';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import background from '../assets/hp_background.jpg';
import { styled } from '@mui/system';

const getFreshModelObject = () => ({
  email: '',
  name: ''
});

const StyledCard = styled(Card)({
  backgroundColor: 'rgba(30, 30, 30, 0.9)',
  color: 'white',
  borderRadius: 16,
  padding: '20px',
  backdropFilter: 'blur(10px)'
});

const StyledButton = styled(Button)({
  backgroundColor: 'white',
  color: '#222',
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '12px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  transition: '0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#E6C200',
    transform: 'scale(1.05)'
  }
});

export default function Login() {
  const { context, setContext, resetContext } = useStateContext();
  const navigate = useNavigate();

  const { values, handleInputChange, errors, setErrors } = useForm(getFreshModelObject);

  useEffect(() => {
    resetContext();
  }, []);

  const login = (e) => {
    e.preventDefault();
    if (validate()) {
      createAPIEndpoint(ENDPOINTS.participant)
        .post(values)
        .then(res => {
          setContext({ participantId: res.data.participantID });
          navigate('/quiz');
        })
        .catch(err => console.log(err));
    }
  };

  const validate = () => {
    let temp = {};
    temp.email = /\S+@\S+\.\S+/.test(values.email) ? '' : 'Invalid Email';
    temp.name = values.name ? '' : 'This field is required';
    setErrors(temp);
    return Object.values(temp).every(x => x === '');
  };

  return (
    <Box sx={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <StyledCard sx={{ maxWidth: 420, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="h3" sx={{ fontFamily: 'Rubik', mb: 3 }}>
            <b>Harry Potter Trivia</b>
          </Typography>
          <form noValidate autoComplete="on" onSubmit={login}>
            <TextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
              {...(errors.email && { error: true, helperText: errors.email })}
              required
              InputProps={{
                style: { color: 'white', borderColor: 'white', fontSize: '1rem' }
              }}
              InputLabelProps={{ style: { color: 'white', fontSize: '1rem' } }}
            />
            <TextField
              label="Wizard Name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              variant="outlined"
              fullWidth
              margin="normal"
              {...(errors.name && { error: true, helperText: errors.name })}
              required
              InputProps={{
                style: { color: 'white', borderColor: 'white', fontSize: '1rem' }
              }}
              InputLabelProps={{ style: { color: 'white', fontSize: '1rem' } }}
            />
            <StyledButton type="submit" variant="contained" size="large" fullWidth sx={{ mt: 2 }}>
              Begin Your Journey
            </StyledButton>
          </form>
        </CardContent>
      </StyledCard>
    </Box>
  );
}
