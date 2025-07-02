const express = require('express');

// Для работы с базой данных
const mongoDb = global.mongoDb;

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate
router.post('/calculate', (req, res) => {
  try {
    const { number1, number2, operation } = req.body;

    // Проверка входных данных
    if (number1 === undefined || number2 === undefined || operation === undefined) {
      return res.status(400).json({
        error: 'Missing required parameters: number1, number2, and operation are required'
      });
    }

    // Преобразование входных данных в числа
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    // Проверка, являются ли входные данные числами
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({
        error: 'Invalid input: number1 and number2 must be valid numbers'
      });
    }

    let result;
    switch (operation) {
      case 'add':
        result = num1 + num2;
        break;
      case 'subtract':
        result = num1 - num2;
        break;
      case 'multiply':
        result = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          return res.status(400).json({
            error: 'Division by zero is not allowed'
          });
        }
        result = num1 / num2;
        break;
      case 'percentage':
        result = (num1 * num2) / 100;
        break;
      default:
        return res.status(400).json({
          error: 'Invalid operation: supported operations are add, subtract, multiply, divide, percentage'
        });
    }

    // Возвращаем результат с округлением до 2 знаков после запятой для читаемости
    res.json({
      result: Math.round(result * 100) / 100
    });
  } catch (error) {
    console.error('Error in calculate endpoint:', error);
    res.status(500).json({
      error: 'Internal server error'
    });
  }
});

module.exports = router;
