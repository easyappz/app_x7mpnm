import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const handleNumberClick = (value) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
    } else {
      // Prevent multiple decimal points
      if (value === '.' && display.includes('.')) {
        return;
      }
      setDisplay(display + value);
    }
  };

  const handleOperationClick = (op) => {
    setOperation(op);
    setPreviousValue(parseFloat(display));
    setWaitingForSecondValue(true);
    setDisplay('0');
  };

  const handleEqualsClick = () => {
    if (!operation || !previousValue) return;

    const currentValue = parseFloat(display);
    let result = 0;

    if (operation === '+') {
      result = previousValue + currentValue;
    } else if (operation === '-') {
      result = previousValue - currentValue;
    } else if (operation === '×') {
      result = previousValue * currentValue;
    } else if (operation === '÷') {
      if (currentValue === 0) {
        setDisplay('Error');
        return;
      }
      result = previousValue / currentValue;
    }

    setDisplay(result.toString());
    setOperation(null);
    setPreviousValue(null);
    setWaitingForSecondValue(false);
  };

  const handleClearClick = () => {
    setDisplay('0');
    setOperation(null);
    setPreviousValue(null);
    setWaitingForSecondValue(false);
  };

  const handleSignChange = () => {
    if (display !== '0') {
      setDisplay((parseFloat(display) * -1).toString());
    }
  };

  const handlePercentage = () => {
    if (display !== '0') {
      setDisplay((parseFloat(display) / 100).toString());
    }
  };

  const buttons = [
    { label: 'AC', action: handleClearClick, class: 'button-grey' },
    { label: '+/-', action: handleSignChange, class: 'button-grey' },
    { label: '%', action: handlePercentage, class: 'button-grey' },
    { label: '÷', action: () => handleOperationClick('÷'), class: 'button-orange' },
    { label: '7', action: () => handleNumberClick('7'), class: 'button-dark' },
    { label: '8', action: () => handleNumberClick('8'), class: 'button-dark' },
    { label: '9', action: () => handleNumberClick('9'), class: 'button-dark' },
    { label: '×', action: () => handleOperationClick('×'), class: 'button-orange' },
    { label: '4', action: () => handleNumberClick('4'), class: 'button-dark' },
    { label: '5', action: () => handleNumberClick('5'), class: 'button-dark' },
    { label: '6', action: () => handleNumberClick('6'), class: 'button-dark' },
    { label: '-', action: () => handleOperationClick('-'), class: 'button-orange' },
    { label: '1', action: () => handleNumberClick('1'), class: 'button-dark' },
    { label: '2', action: () => handleNumberClick('2'), class: 'button-dark' },
    { label: '3', action: () => handleNumberClick('3'), class: 'button-dark' },
    { label: '+', action: () => handleOperationClick('+'), class: 'button-orange' },
    { label: '0', action: () => handleNumberClick('0'), class: 'button-dark span-two' },
    { label: '.', action: () => handleNumberClick('.'), class: 'button-dark' },
    { label: '=', action: handleEqualsClick, class: 'button-orange' }
  ];

  return (
    <Box className="calculator-container">
      <Box className="calculator-display">
        <Typography variant="h2" className="display-text">
          {display}
        </Typography>
      </Box>
      <Grid container className="calculator-buttons" spacing={1}>
        {buttons.map((btn, index) => (
          <Grid item xs={btn.label === '0' ? 6 : 3} key={index}>
            <Box
              className={`calculator-button ${btn.class}`}
              onClick={btn.action}
            >
              <Typography variant="h6">
                {btn.label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Calculator;
