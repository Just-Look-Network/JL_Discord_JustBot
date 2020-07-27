const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();

app.use(cors());
app.use(logger('dev'));

// configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connection
const db = require('./models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: 'Hello World.' });
});

require('./routes/tutorial.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
