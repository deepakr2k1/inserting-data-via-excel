const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 8000;

const dbURI = 'mongodb+srv://DEEPAK_RATHORE:lYZEKmKVo79MURL6@cluster0.cq3tc.mongodb.net/candidatesDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err))

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(require('body-parser').json());

app.use('/', require('./routes/candidateRoutes'));

app.listen(port, console.log(`Server is listening on port ${port}`))