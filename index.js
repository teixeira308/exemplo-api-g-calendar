const express = require('express');
const calendarRoutes = require('./routes/calendarRoutes');
const userRoute = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middleware para JSON
app.use(express.json());

// Usa as rotas de calendário
app.use('/kikobot/v1', calendarRoutes);
app.use('/kikobot/v1/users', userRoute);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
