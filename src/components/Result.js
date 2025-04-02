import React, { useEffect, useState } from 'react';
import useStateContext from '../hooks/useStateContext';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import { Card, CardContent, Typography, Button, CardHeader, Alert, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import background from '../assets/hp_background.jpg';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  backgroundColor: 'rgba(30, 30, 30, 0.9)',
  color: '#FFFFFF',
  borderRadius: 16,
  boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.6)',
  padding: '20px',
  backdropFilter: 'blur(10px)',
  textAlign: 'center'
});

const StyledButton = styled(Button)({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#FFFFFF',
  margin: '10px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  }
});

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswers, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map(x => x.qnId);
    createAPIEndpoint(ENDPOINTS.getAnswer)
      .post(ids)
      .then(res => {
        const qna = context.selectedOptions.map(x => ({
          ...x,
          ...(res.data.find(y => y.qnId === x.qnId))
        }));
        setQnAnswers(qna);
        calculateScore(qna);
      })
      .catch(err => console.log(err));
  }, [context.selectedOptions]);

  const calculateScore = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer == curr.selected + 1 ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    });
    navigate('/quiz');
  };

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken
      })
      .then(() => {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      })
      .catch(err => console.log(err));
  };

  return (
    <Box sx={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <StyledCard sx={{ maxWidth: 400 }}>
        <CardHeader title="RESULT" sx={{ textAlign: 'center', fontFamily: 'Rubik' }} />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ fontFamily: 'Rubik' }}>
            Score: {score} / 5
          </Typography>
          <Typography sx={{ mb: 1.5, color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'Rubik' }}>
            Time Taken: {context.timeTaken}s
          </Typography>
          <StyledButton variant="contained" onClick={submitScore} size="small">
            Submit
          </StyledButton>
          <StyledButton variant="contained" onClick={restart} size="small">
            Retry
          </StyledButton>
          <Alert
            severity="success"
            variant="filled"
            sx={{
              width: '80%',
              m: 'auto',
              visibility: showAlert ? 'visible' : 'hidden'
            }}>
            Score Updated
          </Alert>
        </CardContent>
      </StyledCard>
    </Box>
  );
}
