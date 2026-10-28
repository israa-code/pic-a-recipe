/* Entry point: starts the HTTP server.
 The Express app itself is built in src/app.js */
const { PORT } = require('./src/config/env');
const app = require('./src/app');

app.listen(PORT, () => {
    console.log(`Server listening`);
});