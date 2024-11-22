const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRouter = require('./routes/auth.router');
const weatherRouter = require('./routes/weather.router');

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  })
);

app.use('/api/auth', authRouter);
app.use('/api/weather', weatherRouter);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
