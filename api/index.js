const express = require('express');
const app = express();
const PORT = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('Database Connection Successful!')).catch((err) => {
    console.log(err);
});

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(PORT, () => {
    console.log('Starting Server => ' + PORT);
});