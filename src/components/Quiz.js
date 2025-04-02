import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItemButton, CardHeader, Box, LinearProgress, CardMedia } from '@mui/material';
import { BASE_URL, createAPIEndpoint, ENDPOINTS } from '../api';
import { getFormatedTime } from '../heper';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';
import background from '../assets/hp_background.jpg';
import { styled } from '@mui/system';

const StyledCard = styled(Card)({
  backgroundColor: 'rgba(30, 30, 30, 0.9)',
  color: '#FFFFFF',
  borderRadius: 16,
  boxShadow: '0px 4px 15px rgba(255, 255, 255, 0.6)',
  padding: '20px',
  backdropFilter: 'blur(10px)'
});

const StyledListItem = styled(ListItemButton)({
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: '#FFFFFF',
  fontSize: '1rem',
  margin: '5px 0',
  borderRadius: '8px',
  transition: '0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    transform: 'scale(1.05)'
  }
});

export default function Quiz() {
  const [qns, setQns] = useState([]);
  const [qnIndex, setQnIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate();
  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeTaken(prev => prev + 1);
    }, 1000);
  };

  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions];
    temp.push({
      qnId,
      selected: optionIdx
    });
    if (qnIndex < qns.length - 1) {
      setContext({ selectedOptions: [...temp] });
      setQnIndex(qnIndex + 1);
    } else {
      setContext({ selectedOptions: [...temp], timeTaken });
      navigate('/result');
    }
  };

  useEffect(() => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    });
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then(res => {
        setQns(res.data);
        startTimer();
      })
      .catch(err => console.log(err));

    return () => clearInterval(timer);
  }, []);

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
      {qns.length !== 0 ? (
        <StyledCard sx={{ maxWidth: 640 }}>
          <CardHeader
            title={`Question ${qnIndex + 1} of ${qns.length}`}
            action={<Typography variant="h6">{getFormatedTime(timeTaken)}</Typography>}
          />
          <Box>
            <LinearProgress variant="determinate" value={(qnIndex + 1) * 100 / qns.length} />
          </Box>
          {qns[qnIndex].imageName != null && (
            <CardMedia
              component="img"
              image={BASE_URL + 'images/' + qns[qnIndex].imageName}
            />
          )}
          <CardContent>
            <Typography variant="h6" sx={{ fontFamily: 'Rubik' }}>
              {qns[qnIndex].qnInWords}
            </Typography>
            <List>
              {qns[qnIndex].options.map((item, idx) => (
                <StyledListItem key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                  <div>
                    <b>{String.fromCharCode(65 + idx) + '. '}</b> {item}
                  </div>
                </StyledListItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      ) : null}
    </Box>
  );
}
