const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const opportunityRoutes = require('./routes/opportunityRoutes');

const app = express();
mongoose.connect('mongodb://localhost:27017/wastezero', { useNewUrlParser: true, useUnifiedTopology: true });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/opportunities', opportunityRoutes);

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
