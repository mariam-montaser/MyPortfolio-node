const path = require('path');

const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const config = require('./config');
const auth = require('./middleware/auth');

const projectRouter = require('./routes/project.routes');
const adminRouter = require('./routes/admin.routes');
const skillsRouter = require('./routes/skill.routes');
const apisRouter = require('./routes/api.routes');


const app = express();

// DB connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
    console.log('connected.');
}).catch(error => {
    console.log(error);
})

// setup
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use('/images', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// routes
app.get('/', (req, res) => {
    res.render('index', {pageTitle: 'Admin Panel'})
})
app.use('/admin', adminRouter);
app.use('/projects', projectRouter);
app.use('/skills', skillsRouter);


// cors & auth middlware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
})


app.use('/api', apisRouter);


// app listen
const port = process.env.port || 5000;

app.listen(port, () => {
    console.log('server is running.');
})