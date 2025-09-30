const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const opportunityRoutes = require('./routes/opportunityRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/opportunities', opportunityRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
