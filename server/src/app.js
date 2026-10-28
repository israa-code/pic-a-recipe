/* Builds and configures the Express app (middleware, routes, error handling).
 Exported without calling listen(); see server.js. */
const express = require('express');
const cors = require('cors');
const geminiRoutes = require('./routes/gemini.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', geminiRoutes);

app.use(errorHandler); //must be last

module.exports = app; 