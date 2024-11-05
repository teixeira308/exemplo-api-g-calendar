const express = require('express');
const { listEvents } = require('../controllers/calendarController');
const login = require('../midlleware/login');

const router = express.Router();

// Define a rota para listar os eventos do calendário
router.get('/events', login.required,listEvents);

module.exports = router;
