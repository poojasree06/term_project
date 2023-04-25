const express = require('express');
const cors = require('cors');
const app = express();
const mongoose=require('mongoose')
const handlePayment = require('./payment');
const router=require('./routes/projectRoute.js')

mongoose.connect('mongodb://localhost:27017/e_commerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB database');
}).catch((err) => {
  console.log('Error connecting to MongoDB database:', err);
});

const port = 5000;

app.use(cors());
app.use(express.json());
app.use(router);
app.post('/api/payment', handlePayment);

app.listen(5000, () => {
  console.log(`Server running on port 5000`);
});


