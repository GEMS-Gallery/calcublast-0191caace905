import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, Button, Container, Grid, Paper, Typography, CircularProgress } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { backend } from 'declarations/backend';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

const App: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    backend.clear();
  };

  const handleOperator = async (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      setLoading(true);
      const result = await backend.calculate(firstOperand, inputValue, operator);
      setLoading(false);
      if (result && result.length > 0) {
        setDisplay(result[0].toString());
        setFirstOperand(result[0]);
      } else {
        setDisplay('Error');
        setFirstOperand(null);
      }
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculateResult = async () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const inputValue = parseFloat(display);
    setLoading(true);
    const result = await backend.calculate(firstOperand, inputValue, operator);
    setLoading(false);
    if (result && result.length > 0) {
      setDisplay(result[0].toString());
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay('Error');
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 2, mt: 4 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'right', minHeight: '48px' }}>
              {loading ? <CircularProgress size={24} /> : display}
            </Typography>
          </Box>
          <Grid container spacing={1}>
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <Grid item xs={3} key={btn}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    if (btn === '=') {
                      calculateResult();
                    } else if (['+', '-', '*', '/'].includes(btn)) {
                      handleOperator(btn);
                    } else if (btn === '.') {
                      inputDecimal();
                    } else {
                      inputDigit(btn);
                    }
                  }}
                  sx={{
                    height: '64px',
                    fontSize: '1.5rem',
                  }}
                  color={['+', '-', '*', '/', '='].includes(btn) ? 'secondary' : 'primary'}
                >
                  {btn}
                </Button>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                onClick={clear}
                sx={{
                  height: '64px',
                  fontSize: '1.5rem',
                }}
                color="error"
                startIcon={<BackspaceIcon />}
              >
                Clear
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
