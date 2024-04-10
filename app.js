const express = require('express');
const app = express();
const Port = 5000;
const mongoose = require('mongoose')
const cors = require('cors')
const mongoUrl = require('./keys')
require('./models/user.model')
app.use(cors())
app.use(express.json())

app.use(require('./routes/auth'))


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }); // Add options for useNewUrlParser and useUnifiedTopology

mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully')
})
mongoose.connection.on('error', (err) => { // Pass the error to see the detailed error message
    console.log('MongoDB connection failed', err)
})

app.get('/', (req, res) => {
    
})
app.get('/signup', (req, res) => {
    
})
app.listen(Port, () => {
    console.log(`Server is running on http://localhost:${Port}`)
})
