const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(logger);

// ---------------------------------------------------------------------------
// configure body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ---------------------------------------------------------------------------
// DB Connection
const db = require('./models');
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Database connected!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

app.get('/', (req, res) => {
    res.json({ message: 'Hello World.' });
});

// ---------------------------------------------------------------------------
// Routes
require('./routes/auth.routes')(app);
require('./routes/tutorial.routes')(app);

// ---------------------------------------------------------------------------
// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on Port: ${PORT}`));
